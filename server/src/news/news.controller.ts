import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/create-news.dto";
import { News } from "./news.model";
import { NewsService } from "./news.service";

@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: "Create a news" })
  @ApiResponse({ status: 200, type: News })
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() dto: CreateNewsDto, @UploadedFile() image) {
    return this.newsService.createNews(dto, image);
  }

  @ApiOperation({ summary: "Get all classes" })
  @ApiResponse({ status: 200, type: [News] })
  @Get()
  getAll() {
    return this.newsService.getAllNews();
  }
}
