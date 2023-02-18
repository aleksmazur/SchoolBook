import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from "moment";
import { DiarySign } from './diary_sign.model';
import { CreateDiarySignDto } from './dto/create-diary_sign.dto';

@Injectable()
export class DiarySignService {
  constructor(
    @InjectModel(DiarySign)
    private diarySignRepository: typeof DiarySign,
  ) {}

  async createSign(dto: CreateDiarySignDto) {
    const sign = await this.diarySignRepository.create(dto);
    return sign;
  }
  
  async getSign(childrenId: number, week?: number, year?: number) {
    if (week && year) {
      // const startDate = moment().year(year).week(week).startOf("week").toDate();
      // const endDate = moment().year(year).week(week).endOf("week").toDate();
      // console.log(startDate, endDate);
      // const signature = await this.diarySignRepository.findOne({
      //   where: {
      //     childrenId,
      //     date: {
      //       $between: [startDate, endDate]
      //     }
      //   },
      //   attributes: ['sign'],
      // });
      // return signature?.sign;
      const startDate = moment().year(year).isoWeek(week).startOf("isoWeek").format("YYYY-MM-DD");
      const endDate = moment().year(year).isoWeek(week).endOf("isoWeek").format("YYYY-MM-DD");
      console.log(startDate, endDate);
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
      // const filteredDiarySigns = diarySigns.filter((diarySign) => {
      //   const date = moment(diarySign.date).format("YYYY-MM-DD");
      //   return date >= startDate && date <= endDate;
      // });
      // if (filteredDiarySigns.length > 0) {
      //   return filteredDiarySigns[0].sign;
      // }
      // return false;
    }
  }
}
