import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddGradeDto } from "./dto/add-grade.dto";
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

  @ApiOperation({ summary: "Get grades" })
  @ApiQuery({ name: "children", required: false })
  @Get("")
  getAll(@Query("children") childrenid?: number) {
    if (childrenid) {
      return this.gradesService.getChildrenGrades(childrenid);
    } else {
      return this.gradesService.getAllGrades();
    }
  }

  @ApiOperation({ summary: "Get current grades by all subjects and grades" })
  @ApiQuery({ name: "children", required: true })
  @ApiQuery({ name: "class", required: true })
  @Get("/current")
  getCurrent(
    @Query("class") classid?: number,
    @Query("children") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.gradesService.getCurrentGrades(classid, childrenid);
    }
  }

  @ApiOperation({ summary: "Get final grades by all subjects and grades" })
  @ApiQuery({ name: "children", required: true })
  @ApiQuery({ name: "class", required: true })
  @Get("/final")
  getFinal(
    @Query("class") classid?: number,
    @Query("children") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.gradesService.getFinalGrades(classid, childrenid);
    }
  }

  @ApiOperation({ summary: "Add grade for children by subject" })
  @ApiResponse({ status: 200, type: Grade })
  @Put("/add")
  addGrade(
    @Body() dto: AddGradeDto
  ) {
    return this.gradesService.addGrade(dto);
  }
}
