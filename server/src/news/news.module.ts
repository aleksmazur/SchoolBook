import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "../files/files.module";
import { NewsController } from "./news.controller";
import { News } from "./news.model";
import { NewsService } from "./news.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([News]), FilesModule, AuthModule],
})
export class NewsModule {}
