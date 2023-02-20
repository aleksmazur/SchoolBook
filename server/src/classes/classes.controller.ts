import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClassRoom } from "./classes.model";
import { ClassesService, CustomError } from "./classes.service";
import { CreateClassRoomDto } from "./dto/create-classroom.dto";

@ApiTags("Classes")
@Controller("classes")
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @ApiOperation({ summary: "Create class" })
  @ApiCreatedResponse({ type: ClassRoom })
  @ApiResponse({ status: CustomError.ClassExists, description: "Class already exists!" })
  @ApiResponse({ status: CustomError.NotHaveRole, description: "User not have 'teacher' role!"})
  @ApiResponse({ status: CustomError.UserHaveClass, description: "User already have a class!" })
  @Post()
  create(@Body() dto: CreateClassRoomDto) {
    return this.classService.createClassRoom(dto);
  }

  @ApiOperation({ summary: "Get all classes" })
  @ApiOkResponse({ type: [ClassRoom] })
  @ApiNotFoundResponse({ description: "Classes not found!" })
  @ApiQuery({ name: "teacher", required: false })
  @ApiQuery({ name: "name", required: false })
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
  @Get(":id")
  getClassByID(@Param("id") id: number) {
    return this.classService.getClass(id);
  }
}
