import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './subjects.model';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject) private subjectsRepository: typeof Subject,
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
}
