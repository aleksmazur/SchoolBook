import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateDiarySignDto } from "../diary/dto/create-diary_sign.dto";
import { DiaryService } from "./diary.service";
import { DiarySign } from "./diary_sign.model";

@ApiTags("Diary")
@Controller("diary")
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @ApiOperation({ summary: "Get diary by class ID and child ID" })
  @ApiParam({ name: "classid", description: "The ID of the class by which to get the diary", example: "2", required: true })
  @ApiParam({ name: "childrenid", description: "The ID of the class by which to get the diary", example: "3", required: true })
  @ApiQuery({ name: "week", description: "Week number for which you want to get the diary", example: "5", required: false })
  @ApiQuery({ name: "year", description: "Year for which you need to get a diary", example: "2023", required: false })
  @ApiNotFoundResponse({ description: "Diary not found!" })
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

  @ApiOperation({ summary: "Add diary signature" })
  @ApiCreatedResponse({ type: DiarySign })
  @ApiNotFoundResponse({ description: "Child not found!" })
  @Post("/sign/add")
  addSign(@Body() dto: CreateDiarySignDto) {
    return this.diaryService.addDiarySign(dto);
  }

  @ApiOperation({ summary: "Get diary signature by child ID" })
  @ApiParam({ name: "childrenid", description: "ID of the child whose diary signature is to be obtained", example: "5", required: true })
  @ApiQuery({ name: "week", description: "Number of the week for which you want to get the signature of the diary", example: "7", required: true })
  @ApiQuery({ name: "year", description: "Year for which you need to get the signature of the diary", example: "2023", required: true })
  @ApiOkResponse({ description: "Status, diary signed or not (true or false)" })
  @ApiNotFoundResponse({ description: "Child not found!" })
  @Get("/sign/get/:childrenid")
  getSign(
    @Param("childrenid") childrenid: number,
    @Query("week") week?: number,
    @Query("year") year?: number,
  ) {
    return this.diaryService.getStatusDiarySign(childrenid, week, year);
  }
}
