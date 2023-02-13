import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiQuery({ name: "children", required: false })
  @Get()
  getAll(
    @Query("class") classid?: number,
    @Query("children") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.gradesService.getCurrentGrades(classid, childrenid);
    }
    if (childrenid) {
      return this.gradesService.getChildrenGrades(childrenid);
    } else {
      return this.gradesService.getAllGrades();
    }
  }
}
