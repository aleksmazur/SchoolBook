import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ClassRoom } from "./classes.model";
import { ClassesService } from "./classes.service";
import { ClassesErrors } from "./errors.enum";
import { CreateClassRoomDto } from "./dto/create-classroom.dto";

@ApiTags("Classes")
@ApiBearerAuth()
@Controller("classes")
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @ApiOperation({ summary: "Create class" })
  @ApiCreatedResponse({ type: ClassRoom })
  @ApiResponse({
    status: ClassesErrors.ClassExists,
    description: "Class already exists!",
  })
  @ApiResponse({
    status: ClassesErrors.NotHaveRole,
    description: "User not have 'teacher' role!",
  })
  @ApiResponse({
    status: ClassesErrors.UserHaveClass,
    description: "User already have a class!",
  })
  @Post()
  create(@Body() dto: CreateClassRoomDto) {
    return this.classService.createClassRoom(dto);
  }

  @ApiOperation({ summary: "Get all classes" })
  @ApiOkResponse({ type: [ClassRoom] })
  @ApiNotFoundResponse({ description: "Classes not found!" })
  @ApiQuery({
    name: "teacher",
    description: "Teacher ID to find his class",
    required: false,
    example: "2",
  })
  @ApiQuery({
    name: "name",
    description: "Class name to search for a class by its name",
    required: false,
    example: "1А",
  })
  @Get()
  getAll(@Query("teacher") teacherId?: number, @Query("name") name?: string) {
    if (teacherId) {
      return this.classService.getClassesByTeacher(teacherId);
    }
    if (name) {
      return this.classService.getClassByName(name);
    }
    return this.classService.getAllClasses();
  }

  @ApiOperation({ summary: "Get class by ID" })
  @ApiOkResponse({ type: ClassRoom })
  @ApiNotFoundResponse({ description: "Class not found!" })
  @ApiParam({
    name: "id",
    description: "Class ID to get information about it",
    example: "2",
    required: true,
  })
  @Get(":id")
  getClassByID(@Param("id") id: number) {
    return this.classService.getClass(id);
  }
}
