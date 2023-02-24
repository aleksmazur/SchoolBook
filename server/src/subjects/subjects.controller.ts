import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AddHomeworkDto } from "./dto/add-homework.dto";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subject } from "./subjects.model";
import { SubjectsService } from "./subjects.service";

@ApiTags("Subjects")
@Controller("subjects")
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({ summary: "Create a subject" })
  @ApiCreatedResponse({ type: Subject })
  @ApiNotFoundResponse({ description: "Quarter not found!" })
  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.createSubject(dto);
  }

  @ApiOperation({ summary: "Get all subjects" })
  @ApiOkResponse({ type: [Subject] })
  @ApiQuery({
    name: "class",
    example: "3",
    description: "Class ID",
    required: true,
  })
  @ApiQuery({
    name: "childrenid",
    example: "2",
    description: "Child ID",
    required: true,
  })
  @ApiQuery({
    name: "name",
    example: "Mathematics",
    description: "Subject name",
    required: false,
  })
  @ApiQuery({
    name: "quarter",
    example: "2",
    description: "Number of quarter",
    required: false,
  })
  @ApiNotFoundResponse({
    description: "Class, child, name or quarter not found!",
  })
  @Get()
  getAll(
    @Query("class") classid?: number,
    @Query("childrenid") childrenid?: number,
    @Query("name") name?: string,
    @Query("quarter") quarter?: number,
  ) {
    if (classid && name && quarter) {
      return this.subjectsService.sortSubjects(classid, name, quarter);
    }
    if (classid && childrenid) {
      return this.subjectsService.findByChildrenClass(classid, childrenid);
    }
    return this.subjectsService.getAllSubjects();
  }

  @ApiOperation({ summary: "Add homework for subject" })
  @ApiCreatedResponse({ type: Subject })
  @ApiParam({
    name: "id",
    example: "2",
    description: "ID subject",
    required: true,
  })
  @ApiNotFoundResponse({ description: "Subject not found!" })
  @Put("/homework/add/:id")
  addSubject(@Param("id") id: number, @Body() dto: AddHomeworkDto) {
    return this.subjectsService.addSubjectHomework(id, dto);
  }
}
