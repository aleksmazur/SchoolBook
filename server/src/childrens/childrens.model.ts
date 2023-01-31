import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../users/users.model";

interface ChildrenCreationAttrs {
  firstName: string;
  lastName: string;
  className: string;
  parentId: number;
}

@Table({ tableName: "childrens" })
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

  @ApiProperty({ example: "1A", description: "Class name" })
  @Column({ type: DataType.STRING, allowNull: false })
  className: string;

  @ForeignKey(() => User)
  @Column
  parentId: number;

  @BelongsTo(() => User)
  parent: User;
}
