import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClassRoom } from "./classes.model";
import { ClassesService } from "./classes.service";
import { CreateClassRoomDto } from "./dto/create-classroom.dto";

@ApiTags("Classes")
@Controller("classes")
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @ApiOperation({ summary: "Create a class" })
  @ApiResponse({ status: 200, type: ClassRoom })
  @Post()
  create(@Body() dto: CreateClassRoomDto) {
    return this.classService.createClassRoom(dto);
  }

  @ApiOperation({ summary: "Get all classes" })
  @ApiResponse({ status: 200, type: [ClassRoom] })
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
  @ApiResponse({ status: 200, type: ClassRoom })
  @Get(":id")
  getClassByID(@Param("id") id: number) {
    return this.classService.getClass(id);
  }
}
