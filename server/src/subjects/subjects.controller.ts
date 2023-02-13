import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @Get()
  getAll(
    @Query("class") classid?: number,
    @Query("childrenid") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.subjectsService.findByChildrenClass(classid, childrenid);
    }
    return this.subjectsService.getAllSubjects();
  }
}
