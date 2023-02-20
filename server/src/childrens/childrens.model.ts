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

  @ApiProperty({ example: "Ivan", description: "First child name" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: "Petrov", description: "Last child name" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: "Denisovich", description: "Middle child name" })
  @Column({ type: DataType.STRING, allowNull: true })
  middleName: string;

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
    description: "Adress of child",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  adress: string;

  @ApiProperty({ example: "12.01.2012", description: "Date of birthday" })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthday: string | Date;

  @Column({ type: DataType.STRING, allowNull: true })
  gender: string;

  @ForeignKey(() => ClassRoom)
  @Column
  classId: number;

  @BelongsTo(() => ClassRoom)
  class: ClassRoom;

  @ForeignKey(() => User)
  @Column
  parentId: number;

  @BelongsToMany(() => User, () => UserChildrens)
  parents: User[];

  @HasMany(() => Grade)
  grades: [Grade];

  @Column({ type: DataType.STRING, allowNull: true })
  profilePic: string;

  @HasMany(() => DiarySign)
  approves: [DiarySign];
}
