import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Grade } from "../grades/grades.model";
import { ClassRoom } from "../classes/classes.model";
import { SubjectsController } from "./subjects.controller";
import { Subject } from "./subjects.model";
import { SubjectsService } from "./subjects.service";

@Module({
  providers: [SubjectsService],
  controllers: [SubjectsController],
  imports: [SequelizeModule.forFeature([Subject, ClassRoom, Grade])],
  exports: [
    SubjectsService
  ]
})
export class SubjectsModule {}
