import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @Get()
  getAll() {
    return this.subjectsService.getAllSubjects();
  }
}
