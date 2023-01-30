import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: "role", required: false })
  @Get()
  getAll(@Query("role") role?: string) {
    if (role) {
      return this.usersService.getUsersByRole(role);
    }
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get(":id")
  getUserByID(@Param("id") id: number) {
    return this.usersService.getUserByID(id);
  }

  @ApiOperation({ summary: "Remove user by ID" })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  @Delete(":id")
  deleteUserByID(@Param("id") id: number) {
    return this.usersService.deleteUserByID(id);
  }
}
