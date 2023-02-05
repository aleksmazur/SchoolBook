import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Subject } from "../subjects/subjects.model";
import { Children } from "../childrens/childrens.model";

interface GradeCreationAttrs {
  value: number;
  childrenId: number;
  subjectId: number;
}

@Table({ tableName: "grades", createdAt: false, updatedAt: false })
export class Grade extends Model<Grade, GradeCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "5", description: "Subject grade" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  value: number;

  @ApiProperty({ example: "1", description: "ID of children" })
  @ForeignKey(() => Children)
  @Column
  childrenId: number;

  @BelongsTo(() => Children)
  children: Children

  @ApiProperty({ example: "4", description: "ID of subject" })
  @ForeignKey(() => Subject)
  @Column
  subjectId: number;

  @BelongsTo(() => Subject)
  subject: Subject
}
