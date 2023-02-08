import { Module } from '@nestjs/common';
import { SubjectsModule } from '../subjects/subjects.module';
import { SheduleController } from './shedule.controller';
import { SheduleService } from './shedule.service';

@Module({
  providers: [SheduleService],
  controllers: [SheduleController],
  imports: [
    SubjectsModule
  ]

})
export class SheduleModule {}
