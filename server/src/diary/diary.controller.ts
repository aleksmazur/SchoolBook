import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';

@ApiTags("Diary")
@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @ApiOperation({ summary: "Get diary by children ID" })
  @ApiQuery({ name: "week", required: false })
  @Get("/:classid/:childrenid")
  getChildrenDiary(
    @Param("classid") classid: number,
    @Param("childrenid") childrenid: number,
    @Query("week") week?: number
  ) {
    if (!week) {
      return this.diaryService.getChildrenDiaryByClass(classid, childrenid);
    } else {
      return this.diaryService.getChildrenDiaryByClass(classid, childrenid, week);
    }
  }
}
