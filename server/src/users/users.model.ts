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
import { UserChildrens } from "./user-childrens.model";
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

  @ApiProperty({ example: "Bukina Daria", description: "Full user name" })
  @Column({ type: DataType.STRING })
  fullName: string;

  @BeforeCreate
  @BeforeUpdate
  static setFullName(instance: User) {
    instance.fullName = `${instance.lastName} ${instance.firstName}`;
  }

  @ApiProperty({ example: "(012)345-67-89", description: "User phone number" })
  @Column({ type: DataType.STRING })
  phone: string;

  @ApiProperty({ example: "Female", description: "User gender" })
  @Column({ type: DataType.STRING, allowNull: true })
  gender: string;

  @ApiProperty({ type: () => [Role] })
  @BelongsToMany(() => Role, () => UserRoles)
  role: [Role];

  @ApiProperty({ type: () => [Children] })
  @BelongsToMany(() => Children, () => UserChildrens)
  childrens: [Children];

  @ApiProperty({ type: () => ClassRoom })
  @HasOne(() => ClassRoom)
  class: ClassRoom;

  @ApiProperty({
    example: "89d345a5-5a10-48cb-a533-5ed3491776ae.png",
    description: "User Profile Picture",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  profilePic: string;
}
