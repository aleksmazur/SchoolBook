import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChildrensModule } from "../childrens/childrens.module";
import { Children } from "../childrens/childrens.model";
import { Subject } from "../subjects/subjects.model";
import { GradesController } from "./grades.controller";
import { Grade } from "./grades.model";
import { GradesService } from "./grades.service";
import { SubjectsModule } from "../subjects/subjects.module";

@Module({
  providers: [GradesService],
  controllers: [GradesController],
  imports: [
    SequelizeModule.forFeature([Grade, Children, Subject]),
    ChildrensModule,
    forwardRef(() => SubjectsModule),
  ],
  exports: [GradesService],
})
export class GradesModule {}
