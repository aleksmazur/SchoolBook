import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { NewsController } from "./news.controller";
import { News } from "./news.model";
import { NewsService } from "./news.service";

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([News])],
})
export class NewsModule {}