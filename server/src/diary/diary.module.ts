import { Module } from "@nestjs/common";
import { DiarySignModule } from "src/diary_sign/diary_sign.module";
import { SubjectsModule } from "../subjects/subjects.module";
import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";

@Module({
  providers: [DiaryService],
  controllers: [DiaryController],
  imports: [
    SubjectsModule,
    DiarySignModule
  ],
})
export class DiaryModule {}
