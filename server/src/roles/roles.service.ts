import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";

const assignedRoles = ["teacher", "parent"];

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    if (!assignedRoles.includes(dto.value)) {
      throw new HttpException(
        `Role '${dto.value}' not assigned!`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const role = await this.getRoleByValue(dto.value);
    if (role) {
      throw new HttpException(
        `Role '${dto.value}' already exists!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const roleCreated = await this.roleRepository.create(dto);
    return roleCreated;
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
