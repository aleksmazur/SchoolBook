import { Module } from "@nestjs/common";
import { InfoService } from "./info.service";
import { InfoController } from "./info.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Info } from "./info.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [InfoService],
  controllers: [InfoController],
  imports: [SequelizeModule.forFeature([Info]), AuthModule],
})
export class InfoModule {}
