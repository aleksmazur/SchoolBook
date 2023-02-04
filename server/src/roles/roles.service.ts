import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoles() {
    const roles = await this.roleRepository.findAll();
    if (!roles.length) {
      throw new HttpException(`Roles not found!`, HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new HttpException(
        `Role '${value}' not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return role;
  }
}
