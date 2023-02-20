import { ApiProperty } from "@nestjs/swagger";
import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Grade } from "../grades/grades.model";
import { ClassRoom } from "../classes/classes.model";
import { UserChildrens } from "../users/dto/user-childrens.model";
import { User } from "../users/users.model";
import { DiarySign } from "../diary/diary_sign.model";

interface ChildrenCreationAttrs {
  firstName: string;
  lastName: string;
  className: string;
  parentId: number;
}

@Table({ tableName: "childrens", createdAt: false, updatedAt: false })
export class Children extends Model<Children, ChildrenCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Ivan", description: "Child's name" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: "Petrov", description: "Surname of the child" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: "Denisovich", description: "Middle name of the child" })
  @Column({ type: DataType.STRING, allowNull: true })
  middleName: string;

  @ApiProperty({ example: "Petrov Ivan Denisovich", description: "Full name of the child" })
  @Column({ type: DataType.STRING })
  fullName: string;

  @BeforeCreate
  @BeforeUpdate
  static setFullName(instance: Children) {
    if (instance.middleName) {
      instance.fullName = `${instance.lastName} ${instance.firstName} ${instance.middleName}`;
    } else {
      instance.fullName = `${instance.lastName} ${instance.firstName}`;
    }
  }

  @ApiProperty({
    example: "street Stroitelei, 12, flat 52",
    description: "Child's address",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  adress: string;

  @ApiProperty({ example: "12.01.2012", description: "Date of birth of the child" })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthday: string | Date;

  @ApiProperty({ example: "male", description: "Gender of the child" })
  @Column({ type: DataType.STRING, allowNull: true })
  gender: string;

  @ApiProperty({ example: "1", description: "The ID of the class the child belongs to" })
  @ForeignKey(() => ClassRoom)
  @Column
  classId: number;

  @ApiProperty({
    description: "Child class object",
    type: ClassRoom
  })
  @BelongsTo(() => ClassRoom)
  class: ClassRoom;

  @ApiProperty({
    example: "1",
    description: "ID of the parent the child belongs to",
  })
  @ForeignKey(() => User)
  @Column
  parentId: number;

  @ApiProperty({
    description: "Child's parents",
    type: [User]
  })
  @BelongsToMany(() => User, () => UserChildrens)
  parents: User[];

  @ApiProperty({
    description: "Child grades",
    type: [Grade]
  })
  @HasMany(() => Grade)
  grades: [Grade];

  @ApiProperty({
    example: "89d345a5-5a10-48cb-a533-5ed3491776ae.png",
    description: "Child Profile Pictures",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  profilePic: string;

  @ApiProperty({
    description: "Signed diary of a child",
    type: [DiarySign]
  })
  @HasMany(() => DiarySign)
  approves: [DiarySign];
}
