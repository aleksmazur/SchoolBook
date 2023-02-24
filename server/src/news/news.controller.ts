import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
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

@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: "Create news" })
  @ApiCreatedResponse({ type: News })
  @ApiInternalServerErrorResponse({
    description: "An error occurred while writing the file",
  })
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
