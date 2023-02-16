import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SubjectsService } from "../subjects/subjects.service";
import { ChildrensService } from "../childrens/childrens.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grades.model";

interface SubjectGrades {
  name: string;
  grades: Array<number>;
  averageGrade: number | null;
}

export interface GradesBySubject {
  [subjectName: string]: {
    [quarter: number]: {
      grades: number[];
      average: number | null;
    };
    finalGrade: number | null;
  };
}

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
    return grades;
  }

  async getChildrenGrades(childrenId: number) {
    const subjects = await this.childrensService.getSubjectsWithGrades(
      childrenId,
    );
    return subjects;
  }

  async getCurrentGrades(classid: number, childrenid: number) {
    const data = await this.subjectsService.findByChildrenClass(
      classid,
      childrenid,
    );
    if (!data.length) {
      throw new HttpException(
        `Grades or subjects in class '${classid}' for children '${childrenid}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const subjects: { [key: string]: SubjectGrades } = data.reduce(
      (acc, item) => {
        const name = item.name;
        const grade = item.grade !== null ? item.grade : [];
        if (!acc[name]) {
          acc[name] = { name, grades: [grade], averageGrade: null };
        } else {
          acc[name].grades.push(grade);
        }
        return acc;
      },
      {},
    );

    const result = Object.values(subjects).map((subject) => {
      const grades = subject.grades.flat();
      const sum = grades.reduce((acc, grade) => acc + grade, 0);
      const avg =
        grades.length > 0 ? Number((sum / grades.length).toFixed(1)) : null;
      return { name: subject.name, grades, averageGrade: avg };
    });

    return result;
  }

  async getFinalGrades(classid: number, childrenid: number) {
    const data = await this.subjectsService.findByChildrenClass(
      classid,
      childrenid,
    );
    if (!data.length) {
      throw new HttpException(
        `Grades or subjects in class '${classid}' for children '${childrenid}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const gradesBySubject: GradesBySubject = {};

    data.forEach((subject) => {
      const { name, quarter, grade } = subject;

      if (!gradesBySubject[name]) {
        gradesBySubject[name] = {
          finalGrade: null,
        };
      }

      const quarterGrades = gradesBySubject[name][quarter.quarter] || {
        grades: [],
        average: null,
      };

      if (quarterGrades && grade !== null) {
        quarterGrades.grades.push(grade);
      }

      gradesBySubject[name][quarter.quarter] = quarterGrades;
    });

    for (const subjectName in gradesBySubject) {
      const quarters = gradesBySubject[subjectName];

      for (const quarter in quarters) {
        const quarterGrades = quarters[quarter];
        if (!quarterGrades) {
          continue;
        }

        const { grades } = quarterGrades;

        if (grades && grades.length > 0) {
          quarterGrades.average =
            grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        }
      }

      const annualGrades = Object.values(quarters).reduce((acc, quarter) => {
        if (!quarter || typeof quarter === "number") {
          return acc;
        }

        const { average } = quarter;

        if (typeof average === "number" && average > 0) {
          acc.push(average);
        }
        return acc;
      }, []);

      if (annualGrades.length > 0) {
        gradesBySubject[subjectName].finalGrade =
          annualGrades.reduce((sum, grade) => sum + grade, 0) /
          annualGrades.length;
      }
    }

    return gradesBySubject;
  }
}
