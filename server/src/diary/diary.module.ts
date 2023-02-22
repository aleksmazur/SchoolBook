import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChildrensModule } from "src/childrens/childrens.module";
import { SubjectsModule } from "../subjects/subjects.module";
import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";
import { DiarySign } from "./diary_sign.model";

@Module({
  providers: [DiaryService],
  controllers: [DiaryController],
  imports: [
    SequelizeModule.forFeature([DiarySign]),
    SubjectsModule,
    ChildrensModule
  ],
})
export class DiaryModule {}
