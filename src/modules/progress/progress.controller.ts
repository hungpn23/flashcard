import { ApiEndpoint } from '@/decorators/endpoint.decorator';
import { JwtPayload } from '@/decorators/jwt-payload.decorator';
import { JwtPayloadType } from '@/types/auth.type';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  FindProgressDto,
  FindProgressResDto,
  ProgressMetadataDto,
  SaveAnswerDto,
  StartProgressDto,
} from './progress.dto';
import { ProgressService } from './progress.service';

@Controller({ path: 'progress', version: '1' })
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @ApiEndpoint({
    type: FindProgressResDto,
    summary: 'find items by progress id',
  })
  @Get(':progressId')
  async findProgress(
    @Param('progressId', ParseIntPipe) progressId: number,
    @JwtPayload() { userId }: JwtPayloadType,
    @Body() dto: FindProgressDto,
  ) {
    return await this.progressService.findProgress(progressId, userId, dto);
  }

  @ApiEndpoint({
    type: Boolean,
    summary: 'start a progress by set id',
  })
  @Post('/start-progress/:setId')
  async startProgress(
    @Param('setId', ParseIntPipe) setId: number,
    @JwtPayload() { userId }: JwtPayloadType,
    @Body() dto: StartProgressDto,
  ) {
    return await this.progressService.startProgress(setId, userId, dto);
  }

  @ApiEndpoint({
    type: ProgressMetadataDto,
    summary: 'save an answer',
  })
  @Post('save-answer/:itemId')
  async saveAnswer(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: SaveAnswerDto,
  ) {
    return await this.progressService.saveAnswer(itemId, dto);
  }
}
