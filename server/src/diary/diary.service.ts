import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubjectsService } from '../subjects/subjects.service';
import * as moment from "moment";

@Injectable()
export class DiaryService {
  constructor(private subjectsService: SubjectsService) {}

  async getChildrenDiaryByClass(classid: number, childrenid: number, week?: number) {
    const subjects = await this.subjectsService.findByChildrenClass(classid, childrenid);
    if (week) {
      const subjectsByWeek = subjects.filter(subject => {
        const subjectDate = moment(subject.date);
        const weekStart = moment().week(week).startOf('week');
        const weekEnd = moment().week(week).endOf('week');
        return subjectDate.isBetween(weekStart, weekEnd);
      });

      if (!subjectsByWeek.length) {
        throw new HttpException(`Subjects in week '${week}' not found!`, HttpStatus.NOT_FOUND);
      }
    
      const subjectsByDay = subjectsByWeek.reduce((acc, subject) => {
        const day = moment(subject.date).locale("ru").format('dddd');
        acc[day] = acc[day] ? acc[day].concat(subject) : [subject];
        return acc;
      }, {});
      return subjectsByDay;
    }
    return subjects;
  }
}
