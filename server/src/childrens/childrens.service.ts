import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassRoom } from 'src/classes/classes.model';
// import { User } from 'src/users/users.model';
import { UsersService } from '../users/users.service';
import { Children } from './childrens.model';
import { CreateChildrenDto } from './dto/create-children.dto';

@Injectable()
export class ChildrensService {
  constructor(@InjectModel(Children) private childrensRepository: typeof Children,
  @Inject(forwardRef(() => UsersService))
  private userService: UsersService) {}
  // private userService: UsersService) {}

  async createChildren(dto: CreateChildrenDto) {
    const children = await this.childrensRepository.create(dto);
    const childrenParent = await this.userService.getUserByID(dto.parentId);
    await children.$set("parents", [childrenParent.id]);
    children.parents = [childrenParent];
    return children;
  }

  async getAllChildrens() {
    const childrens = await this.childrensRepository.findAll({ include: { all: true } });
    if (!childrens.length) {
      throw new HttpException(`Childrens not found!`, HttpStatus.NOT_FOUND);
    }
    return childrens;
  }

  async getChildrensByParent(id: number) {
    const childrens = await this.childrensRepository.findAll({where: { parentId: id }, include: [ClassRoom]});
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
      where:{ 
        parentId: userId,
        id: childId 
      },
      include: [ClassRoom]
    });
    if (!child) {
      throw new HttpException(`Child '${childId}' not found`, HttpStatus.NOT_FOUND);
    }
    return child;
  }
}