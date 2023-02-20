import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Subject } from "../subjects/subjects.model";
import { Children } from "../childrens/childrens.model";
import { User } from "../users/users.model";

interface ClassRoomCreationAttrs {
  className: string;
  classTeacherId: number;
}

@Table({ tableName: "classes", createdAt: false, updatedAt: false })
export class ClassRoom extends Model<ClassRoom, ClassRoomCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "1A", description: "Class name" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  className: string;

  @ApiProperty({ example: "1", description: "Teacher ID" })
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  classTeacherId: number;

  @ApiProperty({ description: "Class Teacher", type: () => User })
  @BelongsTo(() => User)
  classTeacher: User;

  @ApiProperty({ description: "Children in the classroom", type: () => [Children] })
  @HasMany(() => Children)
  childrens: [Children];

  @ApiProperty({ description: "Class items", type: () => [Subject] })
  @HasMany(() => Subject)
  subjects: [Subject];
}
