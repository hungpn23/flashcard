import { OffsetPaginatedDto } from '@/dto/offset-pagination/paginated.dto';
import { OffsetPaginationQueryDto } from '@/dto/offset-pagination/query.dto';
import paginate from '@/utils/offset-paginate';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CardEntity } from './entities/card.entity';
import { SetEntity } from './entities/set.entity';
import {
  CreateSetDto,
  SetDetailDto,
  SetMetadataDto,
  UpdateSetDto,
} from './set.dto';
import { EditableBy, VisibleTo } from './set.enum';

@Injectable()
export class SetService {
  async findPublicSets(query: OffsetPaginationQueryDto, userId: string) {
    const builder = SetEntity.createQueryBuilder('set')
      .leftJoin('set.user', 'user')
      .where('set.createdBy != :userId', { userId })
      .andWhere('set.visibleTo IN (:...visibleTos)', {
        visibleTos: [VisibleTo.EVERYONE, VisibleTo.PEOPLE_WITH_A_PASSWORD],
      })
      .select(['set', 'user.username']);

    return await paginate(builder, query);
  }

  async findPublicSetDetail(setId: string) {
    return await SetEntity.findOneOrFail({
      where: {
        id: setId,
        visibleTo: In([VisibleTo.EVERYONE, VisibleTo.PEOPLE_WITH_A_PASSWORD]),
      },
      relations: ['cards'],
    });
  }

  async findMySets(query: OffsetPaginationQueryDto, userId: string) {
    const builder = SetEntity.createQueryBuilder('set')
      .leftJoin('set.user', 'user')
      .leftJoin('set.cards', 'cards')
      .where('set.createdBy = :userId', { userId })
      .select(['set', 'cards', 'user.username']);

    const { data, metadata } = await paginate(builder, query);
    const formatted = data.map((set) => {
      return plainToInstance(SetDetailDto, {
        set,
        metadata: this.getSetMetadata(set.cards),
      });
    });

    return new OffsetPaginatedDto<SetDetailDto>(formatted, metadata);
  }

  async findMySetDetail(setId: string, userId: string) {
    return await SetEntity.findOneOrFail({
      where: {
        id: setId,
        createdBy: userId,
      },
      relations: ['cards'],
      select: ['id', 'name', 'description', 'cards'],
    });
  }

  async startLearning() {}

  async saveAnswer(cardId: string, isCorrect: boolean) {
    const card = await CardEntity.findOneOrFail({
      where: { id: cardId },
      relations: ['set'],
      select: ['correctCount', 'set'],
    });

    if (isCorrect) {
      card.correctCount = card.correctCount ? card.correctCount + 1 : 1;
    } else {
      card.correctCount = card.correctCount || 0;
    }

    await CardEntity.save(card);

    const cards = await CardEntity.findBy({
      set: { id: card.set.id },
    });

    return this.getSetMetadata(cards);
  }

  async create(dto: CreateSetDto, userId: string) {
    const [found, user] = await Promise.all([
      SetEntity.findOneBy({
        name: dto.name,
        createdBy: userId,
      }),
      UserEntity.findOneByOrFail({ id: userId }),
    ]);

    if (found) throw new ConflictException('Set with this name already exists');
    if (dto.cards.length < 4)
      throw new BadRequestException('Minimum 4 cards required');

    let visibleToPassword = undefined;
    if (dto.visibleTo === VisibleTo.PEOPLE_WITH_A_PASSWORD) {
      visibleToPassword = dto.visibleToPassword;
    }

    let editableByPassword = undefined;
    if (dto.editableBy === EditableBy.PEOPLE_WITH_A_PASSWORD) {
      editableByPassword = dto.editableByPassword;
    }

    const cards = dto.cards.map((card) => {
      return new CardEntity({ ...card, createdBy: userId });
    });

    const set = new SetEntity({
      ...dto,
      visibleToPassword,
      editableByPassword,
      cards,
      user,
      createdBy: userId,
    });

    return await SetEntity.save(set);
  }

  async update(setId: string, dto: UpdateSetDto, userId: string) {
    const set = await SetEntity.findOneOrFail({
      where: { id: setId, createdBy: userId },
    });

    let visibleToPassword = set.visibleToPassword;
    if (dto.visibleTo === VisibleTo.PEOPLE_WITH_A_PASSWORD) {
      visibleToPassword = dto.visibleToPassword;
    }

    let editableByPassword = set.editableByPassword;
    if (dto.editableBy === EditableBy.PEOPLE_WITH_A_PASSWORD) {
      editableByPassword = dto.editableByPassword;
    }

    return await SetEntity.save(
      Object.assign(set, {
        ...dto,
        visibleToPassword,
        editableByPassword,
        updatedBy: userId,
      } as SetEntity),
    );
  }

  async remove(setId: string, userId: string) {
    const found = await SetEntity.findOneByOrFail({
      id: setId,
      createdBy: userId,
    });

    return await SetEntity.remove(found);
  }

  // ================================================= //
  // ================ PRIVATE METHODS ================ //
  // ================================================= //
  private getSetMetadata(cards: CardEntity[]) {
    const metadata: SetMetadataDto = {
      totalCards: cards.length,
      notStudiedCount: 0,
      learningCount: 0,
      knownCount: 0,
    };

    cards.forEach((p) => {
      if (p.correctCount === null) {
        metadata.notStudiedCount += 1;
      } else if (p.correctCount >= 2) {
        metadata.knownCount += 1;
      } else {
        metadata.learningCount += 1;
      }
    });

    return plainToInstance(SetMetadataDto, metadata);
  }
}
