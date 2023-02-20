import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateDiarySignDto } from "src/diary_sign/dto/create-diary_sign.dto";
import { DiaryService } from "./diary.service";

@ApiTags("Diary")
@Controller("diary")
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @ApiOperation({ summary: "Get diary by children ID" })
  @ApiQuery({ name: "week", required: false })
  @ApiQuery({ name: "year", required: false })
  @Get("/:classid/:childrenid")
  getChildrenDiary(
    @Param("classid") classid: number,
    @Param("childrenid") childrenid: number,
    @Query("week") week?: number,
    @Query("year") year?: number,
  ) {
    return this.diaryService.getChildrenDiaryByClass(
      classid,
      childrenid,
      week,
      year,
    );
  }

  @ApiOperation({ summary: "Add sign for diary" })
  @Post("/sign/add")
  addSign(
    @Body() dto: CreateDiarySignDto
  ) {
    return this.diaryService.addDiarySign(dto);
  }

  @ApiOperation({ summary: "Get sign by children ID" })
  @ApiQuery({ name: "week", required: false })
  @ApiQuery({ name: "year", required: false })
  @Get("/sign/get/:childrenid")
  getSign(
    @Param("childrenid") childrenid: number,
    @Query("week") week?: number,
    @Query("year") year?: number,
  ) {
    return this.diaryService.getStatusDiarySign(
      childrenid,
      week,
      year,
    );
  }
}
