import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateInfoDto } from "./dto/create-info.dto";
import { Info } from "./info.model";

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info) private infoRepository: typeof Info) {}

  async createInfo(dto: CreateInfoDto) {
    const info = await this.infoRepository.create(dto);
    return info;
  }

  async getInfo() {
    const info = await this.infoRepository.findOne();
    if (!info) {
      throw new HttpException("Info not found!", HttpStatus.NOT_FOUND);
    }
    return info;
  }
}
