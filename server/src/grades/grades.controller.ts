import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AddGradeDto } from "./dto/add-grade.dto";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grades.model";
import { GradesService } from "./grades.service";

@ApiTags("Grades")
@Controller("grades")
export class GradesController {
  constructor(private gradesService: GradesService) {}

  @ApiOperation({ summary: "Assign a grade for a child" })
  @ApiCreatedResponse({ type: Grade })
  @ApiNotFoundResponse({ description: "Subject or child not found!" })
  @Post()
  create(@Body() dto: CreateGradeDto) {
    return this.gradesService.createGrade(dto);
  }

  @ApiOperation({ summary: "Get all existing grades" })
  @ApiQuery({
    name: "children",
    example: "2",
    description: "Child ID to get their grades",
    required: false,
  })
  @ApiOkResponse({ description: "Child's grades in specific subjects" })
  @ApiNotFoundResponse({ description: "Subjects or child not found!" })
  @Get()
  getAll(@Query("children") childrenid?: number) {
    if (childrenid) {
      return this.gradesService.getChildrenGrades(childrenid);
    } else {
      return this.gradesService.getAllGrades();
    }
  }

  @ApiOperation({ summary: "Get chilren's current grades" })
  @ApiQuery({
    name: "children",
    example: "2",
    description: "ID of the child whose grades you want to get",
    required: true,
  })
  @ApiQuery({
    name: "class",
    example: "3",
    description: "The ID of the class the child belongs to",
    required: true,
  })
  @ApiNotFoundResponse({ description: "Subjects, class or child not found!" })
  @Get("/current")
  getCurrent(
    @Query("class") classid?: number,
    @Query("children") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.gradesService.getCurrentGrades(classid, childrenid);
    }
  }

  @ApiOperation({ summary: "Get your child's quarterly and yearly grades" })
  @ApiQuery({
    name: "children",
    example: "2",
    description: "ID of the child whose grades you want to get",
    required: true,
  })
  @ApiQuery({
    name: "class",
    example: "3",
    description: "The ID of the class the child belongs to",
    required: true,
  })
  @ApiNotFoundResponse({ description: "Subjects, class or child not found!" })
  @Get("/final")
  getFinal(
    @Query("class") classid?: number,
    @Query("children") childrenid?: number,
  ) {
    if (classid && childrenid) {
      return this.gradesService.getFinalGrades(classid, childrenid);
    }
  }

  @ApiOperation({ summary: "Assign a grade for a child" })
  @ApiCreatedResponse({ type: Grade })
  @ApiNotFoundResponse({ description: "Subject or child not found!" })
  @Put("/add")
  addGrade(@Body() dto: AddGradeDto) {
    return this.gradesService.addGrade(dto);
  }

  @ApiOperation({ summary: "Remove grade" })
  @ApiOkResponse({ description: "Grade successfully removed" })
  @ApiNotFoundResponse({ description: "Grade not found!" })
  @Delete(":id")
  deleteGradeByID(@Param("id") id: number) {
    return this.gradesService.deleteGrade(id);
  }
}
