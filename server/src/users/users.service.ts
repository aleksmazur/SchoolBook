import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "../roles/roles.model";
import { RolesService } from "../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("parent");
    await user.$set("role", [role.id]);
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
}
