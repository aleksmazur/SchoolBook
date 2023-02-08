import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GradesService } from "../grades/grades.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subject } from "./subjects.model";
@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject) private subjectsRepository: typeof Subject,
    private gradesService: GradesService
  ) {}

  async createSubject(dto: CreateSubjectDto) {
    const subject = await this.subjectsRepository.create(dto);
    return subject;
  }

  async getAllSubjects() {
    const subjects = await this.subjectsRepository.findAll({
      include: { all: true },
    });
    if (!subjects.length) {
      throw new HttpException(`Subjects not found!`, HttpStatus.NOT_FOUND);
    }
    return subjects;
  }

  async findByClassId(classId: number) {
    const subjects = await this.subjectsRepository.findAll({
      where: {
        classId,
      },
      attributes: {
        exclude: ["homework"],
      },
    });
    if (!subjects.length) {
      throw new HttpException(
        `Subjects for class ID '${classId}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return subjects;
  }

  async findByChildrenClass(classId: number, childrenid: number): Promise<Array<Partial<Subject> & { grade: number | null }>> {
    const subjects = await this.subjectsRepository.findAll({ where: { classId }});
    if (!subjects.length) {
      throw new HttpException(`Subject for children '${childrenid}' by class '${classId}' not found!`, HttpStatus.NOT_FOUND);
    };

    const grades = await this.gradesService.getGradesByChildren(childrenid);
    return subjects.map(subject => {
      const grade = grades.find(grade => grade.subjectId === subject.id);
      return { ...subject.toJSON(), grade: grade ? grade.value : null };
    });
  }
}
