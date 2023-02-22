import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInfoDto } from './dto/create-info.dto';
import { Info } from './info.model';
import { InfoService } from './info.service';

@ApiTags("Info")
@Controller('info')
export class InfoController {
  constructor(
    private infoService: InfoService
  ) {}

  @ApiOperation({ summary: "Create news" })
  @ApiOkResponse({ type: Info })
  @Post()
  create(@Body() dto: CreateInfoDto) {
    return this.infoService.createInfo(dto);
  }

  @ApiOperation({ summary: "Get all news" })
  @ApiOkResponse({ type: Info })
  @ApiNotFoundResponse({ description: "Info not found!" })
  @Get()
  get() {
    return this.infoService.getInfo();
  }
}
