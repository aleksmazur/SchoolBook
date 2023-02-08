import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubjectsService } from '../subjects/subjects.service';
import * as moment from "moment";

@Injectable()
export class SheduleService {
  constructor(
    private subjectsService: SubjectsService
  ) {}

  async getScheduleByClassId(classId: number){
    const subjects = await this.subjectsService.findByClassId(classId);
    if (!subjects.length) {
      throw new HttpException(`Subjects for class ID '${classId}' not found!`, HttpStatus.NOT_FOUND);
    }
    const currentWeek = moment().week();
    const schedule = subjects
      .filter(subject => {
        const subjectWeek = moment(subject.date).week();
        return subjectWeek === currentWeek;
      })
      .reduce((acc, subject) => {
        const day = moment(subject.date).locale("ru").format('dddd');
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(subject);
        acc[day].sort((a: { date: moment.MomentInput; }, b: { date: moment.MomentInput; }) => {
          const startTimeA = moment(a.date);
          const startTimeB = moment(b.date);
          return startTimeA.diff(startTimeB);
        });
        return acc;
      }, {});
    return schedule;
  }
}
