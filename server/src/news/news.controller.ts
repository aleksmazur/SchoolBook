import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './news.model';
import { NewsService } from './news.service';

@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: "Create a news" })
  @ApiResponse({ status: 200, type: News })
  @Post()
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.createNews(dto);
  }

  @ApiOperation({ summary: "Get all classes" })
  @ApiResponse({ status: 200, type: [News] })
  @Get()
  getAll() {
    return this.newsService.getAllNews();
  }
}
