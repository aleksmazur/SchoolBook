import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Grade } from "../grades/grades.model";
import { Children } from "../childrens/childrens.model";
import { Subject } from "../subjects/subjects.model";
import { User } from "../users/users.model";
import { ClassRoom } from "./classes.model";
import { CreateClassRoomDto } from "./dto/create-classroom.dto";
import { UsersService } from "src/users/users.service";

export enum CustomError {
  //Class already exists
  ClassExists = 432,
  //User dont have 'teacher' role
  NotHaveRole = 433,
  //User already have a class
  UserHaveClass = 434
}

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(ClassRoom)
    private classesRepository: typeof ClassRoom,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async createClassRoom(dto: CreateClassRoomDto) {
    const className = await this.classesRepository.findOne(({
      where: {
        className: dto.className
      }
    }));
    if (className) {
      throw new HttpException(`Class with name '${dto.className}' already exists!`, CustomError.ClassExists);
    }
    const teacher = await this.usersService.getUserByID(dto.classTeacherId);
    const teacherRole = await this.usersService.getUserRoles(teacher.id);
    if (!teacherRole.includes("teacher")) {
      throw new HttpException(`User with ID '${teacher.id}' is not have 'teacher' role`, CustomError.NotHaveRole);
    }
    if (teacher.class !== null) {
      throw new HttpException(`User with ID '${teacher.id}' already have a class`, CustomError.UserHaveClass);
    }
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

  async getClassByChild(childid: number, classid: number) {
    const classItem = await this.classesRepository.findOne({
      where: {
        id: classid
      },
      include: [
        {
          model: Children,
          where: { id: childid }
        }
      ]
    });
    if (!classItem) {
      throw new HttpException(`Class ID '${classid}' by child ID '${childid}' not found!`, HttpStatus.NOT_FOUND);
    }
    return classItem;
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
