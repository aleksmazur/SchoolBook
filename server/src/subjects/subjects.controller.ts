import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddHomeworkDto } from "./dto/add-homework.dto";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subject } from "./subjects.model";
import { SubjectsService } from "./subjects.service";

@ApiTags("Subjects")
@Controller("subjects")
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({ summary: "Create a subject" })
  @ApiResponse({ status: 200, type: Subject })
  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.createSubject(dto);
  }

  @ApiOperation({ summary: "Get all subjects" })
  @ApiResponse({ status: 200, type: [Subject] })
  @ApiQuery({ name: "class", required: false })
  @ApiQuery({ name: "childrenid", required: false })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "quarter", required: false })
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
  @ApiResponse({ status: 200, type: Subject })
  @Put("/homework/add/:id")
  addSubject(
    @Param("id") id: number,
    @Body() dto: AddHomeworkDto
  ) {
    return this.subjectsService.addSubjectHomework(id, dto);
  }
}
