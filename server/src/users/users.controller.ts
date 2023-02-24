import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  // ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Children } from "../childrens/childrens.model";
import { Role } from "../auth/role-auth.decorator";
import { RoleGuard } from "../auth/role.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create a user" })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: "User with username already exists!" })
  @ApiForbiddenResponse({ description: "No access!" })
  @ApiNotFoundResponse({ description: "Role not found!" })
  @Role("teacher")
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({ type: [User] })
  @ApiQuery({
    name: "role",
    example: "parent",
    description: "Value of role",
    required: false,
  })
  @ApiNotFoundResponse({ description: "Users not found!" })
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

  @ApiOperation({ summary: "Get user" })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiParam({
    name: "id",
    example: "5",
    description: "User ID",
    required: true,
  })
  @Get(":id")
  getUserByID(@Param("id") id: number) {
    return this.usersService.getUserByID(id);
  }

  @ApiOperation({ summary: "Get user child's" })
  @ApiOkResponse({ type: [Children] })
  @ApiNotFoundResponse({ description: "Child's not found" })
  @ApiParam({
    name: "id",
    example: "4",
    description: "User ID",
    required: true,
  })
  @Get("childrens/:id")
  getUserChildrens(@Param("id") id: number) {
    return this.usersService.getUserChildrens(id);
  }

  @ApiOperation({ summary: "Get user child" })
  @ApiOkResponse({ type: Children })
  @ApiNotFoundResponse({ description: "Child not found" })
  @ApiParam({
    name: "userId",
    example: "3",
    description: "User ID",
    required: true,
  })
  @ApiParam({
    name: "childId",
    example: "2",
    description: "Child ID",
    required: true,
  })
  @Get("childrens/:userId/:childId")
  getUserChildren(
    @Param("userId") userId: number,
    @Param("childId") childId: number,
  ) {
    return this.usersService.getUserChildren(userId, childId);
  }

  @ApiOperation({ summary: "Remove user by ID" })
  @ApiOkResponse({ description: "User successfully removed!" })
  @ApiNotFoundResponse({ description: "User not found" })
  @Delete(":id")
  deleteUserByID(@Param("id") id: number) {
    return this.usersService.deleteUserByID(id);
  }

  @ApiOperation({ summary: "Add user role" })
  @ApiCreatedResponse({ type: AddRoleDto })
  @ApiNotFoundResponse({ description: "User or role not found" })
  @ApiBadRequestResponse({ description: "User already has this role" })
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addUserRole(dto);
  }

  @ApiOperation({ summary: "Change user role" })
  @ApiCreatedResponse({ type: AddRoleDto })
  @ApiNotFoundResponse({ description: "User or role not found" })
  @ApiBadRequestResponse({ description: "User already has this role" })
  @Put("/role/update")
  changeRole(@Body() dto: AddRoleDto) {
    return this.usersService.changeUserRole(dto);
  }

  @ApiOperation({ summary: "Change profile" })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse({ description: "User not found!" })
  @ApiInternalServerErrorResponse({
    description: "An error occurred while writing the file",
  })
  @Put("/edit/profile")
  @UseInterceptors(FileInterceptor("profilePic"))
  changeProfile(@Body() dto: EditProfileDto, @UploadedFile() image) {
    return this.usersService.editProfile(dto, image);
  }
}
