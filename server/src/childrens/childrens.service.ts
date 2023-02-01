import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { Children } from './childrens.model';
import { CreateChildrenDto } from './dto/create-children.dto';

@Injectable()
export class ChildrensService {
  constructor(@InjectModel(Children) private childrensRepository: typeof Children,
  private userService: UsersService) {}

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
    const childrens = await this.childrensRepository.findAll({where: { id }});
    if (!childrens.length) {
      throw new HttpException(
        `Childrens by parent ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return childrens;
  }
}