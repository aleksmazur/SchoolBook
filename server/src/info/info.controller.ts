import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateInfoDto } from "./dto/create-info.dto";
import { Info } from "./info.model";
import { InfoService } from "./info.service";
import { RoleControl } from "src/auth/role-auth.decorator";
import { Roles } from "src/roles/roles.enum";
import { RoleGuard } from "src/auth/role.guard";

@ApiTags("Info")
@ApiBearerAuth()
@Controller("info")
export class InfoController {
  constructor(private infoService: InfoService) {}

  @ApiOperation({ summary: "Create info" })
  @ApiCreatedResponse({ type: Info })
  @RoleControl(Roles.Admin)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateInfoDto): Promise<Info> {
    return this.infoService.createInfo(dto);
  }

  @ApiOperation({ summary: "Get info" })
  @ApiOkResponse({ type: Info })
  @ApiNotFoundResponse({ description: "Info not found!" })
  @Get()
  get() {
    return this.infoService.getInfo();
  }
}
