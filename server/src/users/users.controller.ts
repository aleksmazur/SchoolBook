import { Body, Controller, Get, Post, Query } from "@nestjs/common";
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
}
