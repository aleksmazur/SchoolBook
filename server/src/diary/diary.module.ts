import { Module } from '@nestjs/common';
import { SubjectsModule } from "../subjects/subjects.module";
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  providers: [DiaryService],
  controllers: [DiaryController],
  imports: [SubjectsModule],
})
export class DiaryModule {}
