import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "../auth/role-auth.decorator";
import { RoleGuard } from "../auth/role.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: 200, type: User })
  @Role("teacher")
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @ApiQuery({ name: "role", required: false })
  // @ApiHeader({
  //   name: "Authorization",
  //   description: "Auth token",
  // })
  // @Role("teacher")
  // @UseGuards(RoleGuard)
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

  @ApiOperation({ summary: "Add user role" })
  @ApiResponse({ status: HttpStatus.CREATED, type: AddRoleDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User or role not found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already has this role"})
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addUserRole(dto);
  }
}
