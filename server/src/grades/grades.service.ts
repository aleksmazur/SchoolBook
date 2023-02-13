import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grades.model";

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade) private gradesRepository: typeof Grade) {}

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
    if (!grades) {
      throw new HttpException(
        `Grades for childrend '${childrenId}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return grades;
  }
}
