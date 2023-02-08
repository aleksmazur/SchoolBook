import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Children } from "../childrens/childrens.model";
import { Subject } from "../subjects/subjects.model";
import { GradesController } from "./grades.controller";
import { Grade } from "./grades.model";
import { GradesService } from "./grades.service";

@Module({
  providers: [GradesService],
  controllers: [GradesController],
  imports: [SequelizeModule.forFeature([Grade, Children, Subject])],
  exports: [
    GradesService
  ]
})
export class GradesModule {}
