import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Grade } from "src/grades/grades.model";
import { Children } from "../childrens/childrens.model";
import { Subject } from "../subjects/subjects.model";
import { User } from "../users/users.model";
import { ClassRoom } from "./classes.model";
import { CreateClassRoomDto } from "./dto/create-classroom.dto";

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(ClassRoom) private classesRepository: typeof ClassRoom,
  ) {}

  async createClassRoom(dto: CreateClassRoomDto) {
    const classRoom = await this.classesRepository.create(dto);
    return classRoom;
  }

  async getAllClasses() {
    const classes = await this.classesRepository.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "username"],
          },
        },
        {
          model: Children,
        },
        {
          model: Subject,
          include: [
            {
              model: Grade,
            },
          ],
        },
      ],
    });
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
          attributes: {
            exclude: ["password", "username"],
          },
          where: { id },
        },
      ],
    });
    if (!classes.length) {
      throw new HttpException(
        `Classes by teacher ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return classes;
  }

  async getClass(id: number) {
    const classItem = await this.classesRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "username"],
          },
        },
        {
          model: Children,
          separate: true,
          order: [["fullName", "ASC"]],
        },
        {
          model: Subject,
          include: [
            {
              model: Grade,
            },
          ],
        },
      ],
    });
    if (!classItem) {
      throw new HttpException(
        `Class with ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return classItem;
  }

  async getClassByName(name: string) {
    const classItem = await this.classesRepository.findOne({
      where: { className: name },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "username"],
          },
        },
        {
          model: Children,
          separate: true,
          order: [["fullName", "ASC"]],
        },
        {
          model: Subject,
          include: [
            {
              model: Grade,
            },
          ],
        },
      ],
    });
    if (!classItem) {
      throw new HttpException(
        `Class with name '${name}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return classItem;
  }
}
