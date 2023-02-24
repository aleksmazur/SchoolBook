import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Children } from "../childrens/childrens.model";

interface DiarySignCreationAttrs {
  childrenId: number;
  date: string;
  sign: boolean;
}

@Table({ tableName: "diary_sign", createdAt: false, updatedAt: false })
export class DiarySign extends Model<DiarySign, DiarySignCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "1", description: "Child ID" })
  @ForeignKey(() => Children)
  @Column
  childrenId: number;

  @ApiProperty({ description: "Child", type: () => Children })
  @BelongsTo(() => Children)
  children: Children;

  @ApiProperty({
    example: "2023-03-17",
    description: "Date the diary was signed",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: 1;

  @ApiProperty({ example: "true", description: "Signature status" })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  sign: boolean;
}
