import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Info } from './info.model';

@Module({
  providers: [InfoService],
  controllers: [InfoController],
  imports: [
    SequelizeModule.forFeature([Info])
  ]
})
export class InfoModule {}
