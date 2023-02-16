import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Children } from "src/childrens/childrens.model";
import { User } from "../users.model";

@Table({ tableName: "user_childrens", createdAt: false, updatedAt: false })
export class UserChildrens extends Model<UserChildrens> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Children)
  @Column({ type: DataType.INTEGER })
  childrenId: number;
}
