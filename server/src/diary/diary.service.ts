import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SubjectsService } from "../subjects/subjects.service";
import * as moment from "moment";
import { CreateDiarySignDto } from "./dto/create-diary_sign.dto";
import { InjectModel } from "@nestjs/sequelize";
import { DiarySign } from "./diary_sign.model";
import { ChildrensService } from "../childrens/childrens.service";

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(DiarySign)
    private diarySignRepository: typeof DiarySign,
    private subjectsService: SubjectsService,
    private childrensService: ChildrensService,
  ) {}

  async getChildrenDiaryByClass(
    classid: number,
    childrenid: number,
    week?: number,
    year?: number,
  ) {
    const subjects = await this.subjectsService.findByChildrenClass(
      classid,
      childrenid,
    );
    let filteredSubjects = subjects;
    if (week || year) {
      filteredSubjects = subjects.filter((subject) => {
        const subjectDate = moment(subject.date);
        if (week && year) {
          const weekStart = moment().year(year).week(week).startOf("week");
          const weekEnd = moment().year(year).week(week).endOf("week");
          return subjectDate.isBetween(weekStart, weekEnd);
        } else if (week) {
          const weekStart = moment()
            .year(moment(subjectDate).year())
            .week(week)
            .startOf("week");
          const weekEnd = moment()
            .year(moment(subjectDate).year())
            .week(week)
            .endOf("week");
          return subjectDate.isBetween(weekStart, weekEnd);
        } else if (year) {
          const yearStart = moment().year(year).startOf("year");
          const yearEnd = moment().year(year).endOf("year");
          return subjectDate.isBetween(yearStart, yearEnd);
        }
      });
      if (!filteredSubjects.length) {
        throw new HttpException(`Subjects not found!`, HttpStatus.NOT_FOUND);
      }
    }

    const subjectsByDay = filteredSubjects.reduce((acc, subject) => {
      const day = moment(subject.date).format("YYYY.MM.DD");
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(subject);
      acc[day].sort(
        (a: { date: moment.MomentInput }, b: { date: moment.MomentInput }) => {
          const startTimeA = moment(a.date);
          const startTimeB = moment(b.date);
          return startTimeA.diff(startTimeB);
        },
      );
      return acc;
    }, {});
    const sortedSubjectsByDay = Object.entries(subjectsByDay)
      .sort((a, b) =>
        moment(a[0], "YYYY.MM.DD").diff(moment(b[0], "YYYY.MM.DD")),
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    return sortedSubjectsByDay;
  }

  async addDiarySign(dto: CreateDiarySignDto) {
    await this.childrensService.getChildren(dto.childrenId);
    const sign = await this.diarySignRepository.create(dto);
    return sign;
  }

  async getStatusDiarySign(childrenId: number, week?: number, year?: number) {
    await this.childrensService.getChildren(childrenId);
    if (week && year) {
      const startDate = moment()
        .year(year)
        .week(week)
        .startOf("week")
        .format("YYYY-MM-DD");
      const endDate = moment()
        .year(year)
        .week(week)
        .endOf("week")
        .format("YYYY-MM-DD");
      const diarySigns = await this.diarySignRepository.findAll({
        where: {
          childrenId,
        },
      });
      let sign = false;
      diarySigns.some((diarySign) => {
        const date = moment(diarySign.date).format("YYYY-MM-DD");
        if (date >= startDate && date <= endDate) {
          sign = diarySign.sign;
          return sign;
        }
      });
      return sign;
    }
    throw new HttpException(
      "Need week and year query params",
      HttpStatus.BAD_REQUEST,
    );
  }
}
