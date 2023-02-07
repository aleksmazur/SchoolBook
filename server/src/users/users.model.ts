import { ApiProperty } from "@nestjs/swagger";
import {
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRoles } from "../roles/user-roles.model";
import { Role } from "../roles/roles.model";
import { Children } from "../childrens/childrens.model";
import { UserChildrens } from "./dto/user-childrens.model";
import { ClassRoom } from "../classes/classes.model";

interface UserCreationAttrs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Table({ tableName: "users", createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "student123", description: "Unique username" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @ApiProperty({ example: "123qwerty123", description: "Username password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "Daria", description: "First name user" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: "Bukina", description: "Last name user" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING })
  fullName: string;

  @BeforeCreate
  @BeforeUpdate
  static setFullName(instance: User) {
    instance.fullName = `${instance.lastName} ${instance.firstName}`;
  }

  @BelongsToMany(() => Role, () => UserRoles)
  role: Role[];

  @BelongsToMany(() => Children, () => UserChildrens)
  childrens: Children[];

  @HasOne(() => ClassRoom)
  class: ClassRoom;
}
