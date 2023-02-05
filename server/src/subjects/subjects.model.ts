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
import { ClassRoom } from "../classes/classes.model";
import { Grade } from "../grades/grades.model";

interface SubjectCreationAttrs {
  name: string;
  homework?: string;
  classId: number;
  date: string;
}

@Table({ tableName: "subjects", createdAt: false, updatedAt: false })
export class Subject extends Model<Subject, SubjectCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Mathematics", description: "Subject name" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: "Complete exercise number 1",
    description: "Homework context",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  homework: string;

  @ApiProperty({
    example: "2023-02-06T08:45:00",
    description: "Date of the subject",
  })
  @Column({ type: DataType.DATE, allowNull: false })
  date: string;

  @ForeignKey(() => ClassRoom)
  @Column
  classId: number;

  @BelongsTo(() => ClassRoom)
  class: ClassRoom;

  @HasMany(() => Grade)
  grades: [Grade];
}
