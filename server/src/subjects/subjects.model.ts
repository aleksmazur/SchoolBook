import { ApiProperty } from "@nestjs/swagger";
import {
  AfterCreate,
  AfterFind,
  BeforeCreate,
  BeforeUpdate,
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
import * as moment from "moment-timezone";
import { Quarter } from "../quarters/quarters.model";

interface SubjectCreationAttrs {
  name: string;
  homework?: string;
  classId: number;
  date: string;
  quarterId: number;
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
    example: "2023-02-06 08:45:00",
    description: "Date of the subject",
  })
  @Column({ type: "timestamp", allowNull: false })
  date: string | Date;

  @BeforeCreate
  @AfterCreate
  @BeforeUpdate
  static async saveDateInUTC(instance: Subject) {
    const assignedTime = moment(instance.date).format("YYYY-MM-DD HH:mm");
    instance.date = assignedTime;
  }

  @AfterFind
  static async convertToLocal(instance: Subject[]) {
    for (const subject of instance) {
      const assignedTime = moment(subject.date).format("YYYY-MM-DD HH:mm");
      subject.date = assignedTime;
    }
  }

  @Column({ type: DataType.STRING })
  startTime: string;

  @BeforeCreate
  @BeforeUpdate
  static setStartTime(instance: Subject) {
    const startTime = moment(instance.date).format("HH:mm");
    instance.startTime = startTime;
  }

  @Column({ type: DataType.STRING })
  endTime: string;

  @BeforeCreate
  @BeforeUpdate
  static async setEndTime(instance: Subject) {
    const endTime = moment(instance.date).add(45, "minutes").format("HH:mm");
    instance.endTime = endTime;
  }

  @ForeignKey(() => ClassRoom)
  @Column
  classId: number;

  @BelongsTo(() => ClassRoom)
  class: ClassRoom;

  @HasMany(() => Grade)
  grades: [Grade];

  @ForeignKey(() => Quarter)
  @Column
  quarterId: number;

  @BelongsTo(() => Quarter)
  quarter: Quarter;
}
