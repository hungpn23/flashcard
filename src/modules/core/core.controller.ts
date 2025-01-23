import { ApiEndpoint, ApiFile } from '@/decorators/endpoint.decorator';
import { validateXlsxPipe } from '@/pipes/validate-file.pipe';
import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { CardDto, ConvertFromTextDto } from '../set/set.dto';
import { CoreService } from './core.service';

@Controller({ path: 'core', version: '1' })
export class CoreController {
  constructor(private coreService: CoreService) {}

  @ApiEndpoint({
    type: CardDto,
    summary: 'convert to cards from text',
  })
  @Post('convert-from-text')
  convertFromText(@Body() { input }: ConvertFromTextDto) {
    return this.coreService.convertFromText(input);
  }

  @ApiFile('xlsx')
  @ApiEndpoint({
    type: CardDto,
    summary: 'convert to cards from xlsx',
  })
  @Post('convert-from-xlsx')
  convertFromXlsx(
    @UploadedFile(validateXlsxPipe())
    file: Express.Multer.File,
  ) {
    return this.coreService.convertFromXlsx(file.buffer);
  }
}
