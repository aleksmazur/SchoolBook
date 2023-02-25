import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { RoleGuard } from "../auth/role.guard";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";
import { RoleControl } from "../auth/role-auth.decorator";
import { Roles } from "./roles.enum";

@ApiTags("Roles")
@ApiBearerAuth()
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Create a user role" })
  @ApiCreatedResponse({ type: Role })
  @ApiNotAcceptableResponse({ description: "Role not assigned!" })
  @ApiBadRequestResponse({ description: "Role already exists!" })
  @ApiUnauthorizedResponse({ description: "User not authorized!" })
  @ApiForbiddenResponse({ description: "No access!" })
  @RoleControl(Roles.Admin)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: "Get all roles" })
  @ApiOkResponse({ type: [Role] })
  @ApiNotFoundResponse({ description: "Roles not found!" })
  @RoleControl(Roles.Admin)
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.roleService.getRoles();
  }

  @ApiOperation({ summary: "Get a role by value" })
  @ApiOkResponse({ type: Role })
  @ApiNotFoundResponse({ description: "Role not found!" })
  @RoleControl(Roles.Admin)
  @UseGuards(RoleGuard)
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
