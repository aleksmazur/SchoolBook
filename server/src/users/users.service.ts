import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ChildrensService } from "../childrens/childrens.service";
import { Children } from "../childrens/childrens.model";
import { Role } from "../roles/roles.model";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @Inject(forwardRef(() => ChildrensService))
    private childrenService: ChildrensService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const userRole = await this.roleService.getRoleByValue("parent");
    if (!userRole) {
      throw new HttpException(`Add the 'parent' role to the database before creating the user`, HttpStatus.NOT_FOUND);
    }
    const user = await this.userRepository.create(dto);
    await user.$set("role", [userRole.id]);
    user.role = [userRole];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    if (!users.length) {
      throw new HttpException(`Users not found!`, HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async getUsersByRole(value: string) {
    const users = await this.userRepository.findAll({
      include: [
        {
          model: Role,
          where: { value },
        },
        {
          model: Children,
        },
      ],
    });
    if (!users.length) {
      throw new HttpException(
        `Users with role (${value}) not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }

  async getUserByID(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException(
        `User with ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUserByID(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        `User with ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await user.destroy();
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }

  async addUserRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      const alreadyHasRole = await user.$has("role", role.id);
      if (alreadyHasRole) {
        throw new HttpException(
          "User already has this role",
          HttpStatus.BAD_REQUEST,
        );
      }
      await user.$add("role", role.id);
      return new HttpException(
        `Role added for ID '${role.id}'`,
        HttpStatus.CREATED,
      );
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async changeUserRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      const alreadyHasRole = await user.$has("role", role.id);
      if (alreadyHasRole) {
        throw new HttpException(
          "User already has this role",
          HttpStatus.BAD_REQUEST,
        );
      }
      await user.$set("role", role.id);
      throw new HttpException(
        `Role change for ID '${role.id}'`,
        HttpStatus.CREATED,
      );
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async getUserChildrens(id: number) {
    const childrens = await this.childrenService.getChildrensByParent(id);
    return childrens;
  }

  async getUserChildren(userId: number, childId: number) {
    const children = await this.childrenService.getChildrenByParent(
      userId,
      childId,
    );
    return children;
  }
}
