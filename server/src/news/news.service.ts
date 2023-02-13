import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { News } from "./news.model";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News,
    private fileService: FilesService
  ) {}

  async createNews(dto: CreateNewsDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const news = await this.newsRepository.create({ ...dto, image: fileName });
    return news;
  }

  async getAllNews() {
    const news = await this.newsRepository.findAll({
      include: { all: true },
    });
    if (!news.length) {
      throw new HttpException(`News not found!`, HttpStatus.NOT_FOUND);
    }
    return news;
  }
}