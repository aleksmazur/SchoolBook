import { Module } from '@nestjs/common';
import { QuartersService } from './quarters.service';
import { QuartersController } from './quarters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quarter } from './quarters.model';
import { Subject } from '../subjects/subjects.model';

@Module({
  providers: [QuartersService],
  controllers: [QuartersController],
  imports: [
    SequelizeModule.forFeature([Quarter, Subject]),
  ],
  exports: [
    QuartersService
  ]
})
export class QuartersModule {}
