import {
  AfterSync,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Role } from "./roles.model";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { DefaultUser } from "../default-user.enum";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @AfterSync
  static async createDefaultUser() {
    const userExists = await User.findOne({
      where: { username: process.env.ADMIN_LOGIN || DefaultUser.Login },
    });
    if (!userExists) {
      const userRole = await Role.findOne({ where: { value: "admin" } });
      if (!userRole) {
        const userRole = await Role.create({
          value: "admin",
          description: "Admin role",
        });
        const defaultUser: CreateUserDto = {
          username: process.env.ADMIN_LOGIN || DefaultUser.Login,
          password: process.env.ADMIN_PASS || DefaultUser.Password,
          firstName: "admin",
          lastName: "admin",
        };
        const hashPassword = await bcrypt.hash(defaultUser.password, 5);
        const user = await User.create({
          ...defaultUser,
          password: hashPassword,
        });
        await user.$set("role", [userRole.id]);
        user.role = [userRole];
      }
    }
  }
}
