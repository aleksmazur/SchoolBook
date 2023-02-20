import { Module } from '@nestjs/common';
import { DiarySignService } from './diary_sign.service';
import { DiarySignController } from './diary_sign.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiarySign } from './diary_sign.model';
import { Children } from '../childrens/childrens.model';
import { ChildrensModule } from 'src/childrens/childrens.module';

@Module({
  providers: [DiarySignService],
  controllers: [DiarySignController],
  imports: [
    SequelizeModule.forFeature([DiarySign, Children]),
    ChildrensModule
  ],
  exports: [
    DiarySignService
  ]
})
export class DiarySignModule {}
