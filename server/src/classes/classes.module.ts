import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { ClassesController } from "./classes.controller";
import { ClassRoom } from "./classes.model";
import { ClassesService } from "./classes.service";

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [SequelizeModule.forFeature([ClassRoom, User])],
})
export class ClassesModule {}
