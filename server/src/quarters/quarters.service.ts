import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { Quarter } from './quarters.model';

@Injectable()
export class QuartersService {
  constructor(
    @InjectModel(Quarter) private quartersRepository: typeof Quarter
  ) {}

  async createQuarter(dto: CreateQuarterDto) {
    const quarter = await this.quartersRepository.create(dto);
    return quarter;
  }

  async getAllQuarters() {
    const quarters = await this.quartersRepository.findAll({
      include: { all: true },
    });
    if (!quarters.length) {
      throw new HttpException(`Quarters not found!`, HttpStatus.NOT_FOUND);
    }
    return quarters;
  }

  async getQuarterByValue(value: number) {
    const quarter = await this.quartersRepository.findOne({
      where: {
        quarter: value
      }
    });
    if (!quarter) {
      throw new HttpException(`Quarter '${value}' not found!`, HttpStatus.NOT_FOUND);
    }
    return quarter;
  }
}
