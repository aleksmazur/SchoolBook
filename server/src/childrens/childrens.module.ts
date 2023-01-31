import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { ChildrensController } from './childrens.controller';
import { Children } from './childrens.model';
import { ChildrensService } from './childrens.service';

@Module({
  controllers: [ChildrensController],
  providers: [ChildrensService],
  imports: [
    SequelizeModule.forFeature([Children, User])
  ],
})
export class ChildrensModule {}
