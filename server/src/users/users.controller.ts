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
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Children } from "src/childrens/childrens.model";
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

  @ApiOperation({ summary: "Get user childrens" })
  @ApiResponse({ status: 200, type: [Children] })
  @ApiResponse({ status: 404, description: "Childrens not found" })
  @Get("childrens/:id")
  getUserChildrens(@Param("id") id: number) {
    return this.usersService.getUserChildrens(id);
  }

  @ApiOperation({ summary: "Get user children" })
  @ApiResponse({ status: 200, type: Children })
  @ApiResponse({ status: 404, description: "Children not found" })
  @Get("childrens/:userId/:childId")
  getUserChildren(
    @Param("userId") userId: number,
    @Param("childId") childId: number
  ) {
    return this.usersService.getUserChildren(userId, childId);
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

  @ApiOperation({ summary: "Change user role" })
  @ApiResponse({ status: HttpStatus.CREATED, type: AddRoleDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User or role not found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already has this role"})
  @Put("/role/update")
  changeRole(@Body() dto: AddRoleDto) {
    return this.usersService.changeUserRole(dto);
  }
}
