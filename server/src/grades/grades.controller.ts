import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grades.model";
import { GradesService } from "./grades.service";

@ApiTags("Grades")
@Controller("grades")
export class GradesController {
  constructor(private gradesService: GradesService) {}

  @ApiOperation({ summary: "Create a grade for subject by children" })
  @ApiResponse({ status: 200, type: Grade })
  @Post()
  create(@Body() dto: CreateGradeDto) {
    return this.gradesService.createGrade(dto);
  }

  @ApiOperation({ summary: "Get all grades" })
  @ApiResponse({ status: 200, type: [Grade] })
  @Get()
  getAll() {
    return this.gradesService.getAllGrades();
  }
}
