import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Grade } from "../grades/grades.model";
import { SubjectsController } from "./subjects.controller";
import { Subject } from "./subjects.model";
import { SubjectsService } from "./subjects.service";
import { GradesModule } from "../grades/grades.module";
import { Quarter } from "../quarters/quarters.model";
import { QuartersModule } from "../quarters/quarters.module";
import { ClassesModule } from "src/classes/classes.module";

@Module({
  providers: [SubjectsService],
  controllers: [SubjectsController],
  imports: [
    SequelizeModule.forFeature([Subject, Grade, Quarter]),
    forwardRef(() => GradesModule),
    QuartersModule
  ],
  exports: [SubjectsService],
})
export class SubjectsModule {}
