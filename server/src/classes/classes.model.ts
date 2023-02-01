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

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  classTeacherId: number;

  @BelongsTo(() => User)
  classTeacher: User;
}
