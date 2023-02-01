import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { ClassRoom } from './classes.model';
import { CreateClassRoomDto } from './dto/create-classroom.dto';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(ClassRoom) private classesRepository: typeof ClassRoom) {}

  async createClassRoom(dto: CreateClassRoomDto) {
    const classRoom = await this.classesRepository.create(dto);
    return classRoom;
  }

  async getAllClasses() {
    const classes = await this.classesRepository.findAll({ include: { all: true }});
    if (!classes.length) {
      throw new HttpException(`Classes not found!`, HttpStatus.NOT_FOUND);
    }
    return classes;
  }

  async getClassesByTeacher(id: number) {
    const classes = await this.classesRepository.findAll({
      include: [
        {
          model: User,
          where: { id },
        },
      ],
    });
    if (!classes.length) {
      throw new HttpException(
        `Childrens by parent ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return classes;
  }
}
