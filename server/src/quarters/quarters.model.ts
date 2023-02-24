import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Subject } from "../subjects/subjects.model";

interface QuarterCreationAttrs {
  quarter: number;
  startDate: string;
  endDate: string;
}

@Table({ tableName: "quarters", createdAt: false, updatedAt: false })
export class Quarter extends Model<Quarter, QuarterCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "2", description: "Number of quarter" })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  quarter: number;

  @ApiProperty({
    example: "2023-02-06",
    description: "Start date of quarter",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  startDate: string | Date;

  @ApiProperty({
    example: "2023-02-06",
    description: "End date of quarter",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  endDate: string | Date;

  @ApiProperty({ type: () => [Subject] })
  @HasMany(() => Subject)
  subjects: [Subject];
}
