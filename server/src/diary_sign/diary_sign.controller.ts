import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiarySign } from './diary_sign.model';
import { DiarySignService } from './diary_sign.service';
import { CreateDiarySignDto } from './dto/create-diary_sign.dto';

@ApiTags("Diary Sign")
@Controller('diary-sign')
export class DiarySignController {
  constructor(private diarySignService: DiarySignService) {}

  @ApiOperation({ summary: "Create a caption for the diary" })
  @ApiResponse({ status: 200, type: DiarySign })
  @Post()
  create(@Body() dto: CreateDiarySignDto) {
    return this.diarySignService.createSign(dto);
  }
}
