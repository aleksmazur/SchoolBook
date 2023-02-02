import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassRoom } from './classes.model';
import { ClassesService } from './classes.service';
import { CreateClassRoomDto } from './dto/create-classroom.dto';

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
  @Get()
  getAll(
    @Query("teacher") teacherId?: number
  ) {
    if (teacherId) {
      return this.classService.getClassesByTeacher(teacherId);
    }
    return this.classService.getAllClasses();
  }
}
