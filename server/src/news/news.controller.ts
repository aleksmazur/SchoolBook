import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/create-news.dto";
import { News } from "./news.model";
import { NewsService } from "./news.service";
import { RoleControl } from "src/auth/role-auth.decorator";
import { RoleGuard } from "src/auth/role.guard";
import { Roles } from "src/roles/roles.enum";

@ApiTags("News")
@ApiBearerAuth()
@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: "Create news" })
  @ApiCreatedResponse({ type: News })
  @ApiInternalServerErrorResponse({
    description: "An error occurred while writing the file",
  })
  @RoleControl(Roles.Admin, Roles.Teacher)
  @UseGuards(RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() dto: CreateNewsDto, @UploadedFile() image) {
    return this.newsService.createNews(dto, image);
  }

  @ApiOperation({ summary: "Get all news" })
  @ApiOkResponse({ type: [News] })
  @ApiNotFoundResponse({ description: "News not found!" })
  @Get()
  getAll() {
    return this.newsService.getAllNews();
  }
}
