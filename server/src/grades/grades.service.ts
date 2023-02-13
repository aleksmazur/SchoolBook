import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SubjectsService } from "src/subjects/subjects.service";
import { ChildrensService } from "../childrens/childrens.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grades.model";

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade)
    private gradesRepository: typeof Grade,
    @Inject(forwardRef(() => SubjectsService))
    private subjectsService: SubjectsService,
    private childrensService: ChildrensService,
  ) {}

  async createGrade(dto: CreateGradeDto) {
    const grade = await this.gradesRepository.create(dto);
    return grade;
  }

  async getAllGrades() {
    const grades = await this.gradesRepository.findAll({
      include: { all: true },
    });
    if (!grades.length) {
      throw new HttpException(`Grades not found!`, HttpStatus.NOT_FOUND);
    }
    return grades;
  }

  async getGradesByChildren(childrenId: number) {
    const grades = await this.gradesRepository.findAll({
      where: { childrenId },
    });
    if (!grades.length) {
      throw new HttpException(
        `Grades for children '${childrenId}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return grades;
  }

  async getChildrenGrades(childrenId: number) {
    const subjects = await this.childrensService.getSubjectsWithGrades(
      childrenId,
    );
    return subjects;
  }

  async getCurrentGrades(classid: number, childrenid: number) {
    const subjects = await this.subjectsService.findByChildrenClass(
      classid,
      childrenid,
    );
    return subjects;
  }
}
