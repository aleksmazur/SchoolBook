import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ClassesService } from "src/classes/classes.service";
import { ClassRoom } from "../classes/classes.model";
import { FilesService } from "../files/files.service";
import { Grade } from "../grades/grades.model";
import { Subject } from "../subjects/subjects.model";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";
import { Children } from "./childrens.model";
import { CreateChildrenDto } from "./dto/create-children.dto";
import { EditChildProfileDto } from "./dto/edit-child-profile.dto";

@Injectable()
export class ChildrensService {
  constructor(
    @InjectModel(Children) private childrensRepository: typeof Children,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private filesService: FilesService,
    private classesService: ClassesService,
  ) {}

  async createChildren(dto: CreateChildrenDto) {
    const childrenParent = await this.userService.getUserByID(dto.parentId);
    await this.classesService.getClass(dto.classId);
    const children = await this.childrensRepository.create(dto);
    await children.$set("parents", [childrenParent.id]);
    children.parents = [childrenParent];
    return children;
  }

  async getAllChildrens() {
    const childrens = await this.childrensRepository.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "username"],
          },
        },
        {
          model: ClassRoom,
        },
        {
          model: Grade,
        },
      ],
    });
    if (!childrens.length) {
      throw new HttpException(`Childrens not found!`, HttpStatus.NOT_FOUND);
    }
    return childrens;
  }

  async getChildrensByParent(id: number) {
    const childrens = await this.childrensRepository.findAll({
      where: { parentId: id },
      include: [ClassRoom],
    });
    if (!childrens.length) {
      throw new HttpException(
        `Childrens by parent ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return childrens;
  }

  async getChildrenByParent(userId: number, childId: number) {
    const child = await this.childrensRepository.findOne({
      where: {
        parentId: userId,
        id: childId,
      },
      include: [ClassRoom],
    });
    if (!child) {
      throw new HttpException(
        `Child '${childId}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return child;
  }

  async getChildren(id: number) {
    const children = await this.childrensRepository.findOne({
      where: { id },
      include: [
        {
          model: ClassRoom,
        },
        {
          model: User,
        },
      ],
    });
    if (!children) {
      throw new HttpException(
        `Children with ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return children;
  }

  async editProfile(dto: EditChildProfileDto, image) {
    const fileName = await this.filesService.createFile(image);
    const children = await this.childrensRepository.findByPk(dto.id);
    if (!children) {
      throw new HttpException(
        `Children with ID '${dto.id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!fileName) {
      throw new HttpException(
        `Filename was not generated!`,
        HttpStatus.FORBIDDEN,
      );
    }
    await children.update({ profilePic: fileName });
    return children;
  }

  async getSubjectsWithGrades(childrenid: number) {
    const children = await this.childrensRepository.findByPk(childrenid, {
      include: [
        {
          model: Grade,
          as: "grades",
          include: [
            {
              model: Subject,
            },
          ],
        },
      ],
    });
    if (!children) {
      throw new HttpException(
        `Children with ID '${children}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const grades = children.grades.map((grade) => {
      return { subject: grade.subject.name, grade: grade.value };
    });

    const groupedGrades = grades.reduce((acc, grade) => {
      if (!acc[grade.subject]) {
        acc[grade.subject] = [];
      }
      acc[grade.subject].push(grade.grade);
      return acc;
    }, {});

    if (JSON.stringify(groupedGrades) === "{}") {
      throw new HttpException(
        `Grades for childrend '${childrenid}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return groupedGrades;
  }
}
