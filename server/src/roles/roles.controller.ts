import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Create a user role" })
  @ApiCreatedResponse({ type: Role })
  @ApiNotAcceptableResponse({ description: "Role not assigned!" })
  @ApiBadRequestResponse({ description: "Role already exists!" })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: "Get all roles" })
  @ApiOkResponse({ type: [Role] })
  @ApiNotFoundResponse({ description: "Roles not found!" })
  @Get()
  getAll() {
    return this.roleService.getRoles();
  }

  @ApiOperation({ summary: "Get a role by value" })
  @ApiOkResponse({ type: Role })
  @ApiNotFoundResponse({ description: "Role not found!" })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
