import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface InfoCreationAttrs {
  name: string;
  location: string;
  adress: string;
  phone: string;
  mail: string;
}

@Table({ tableName: "info", updatedAt: false, createdAt: false })
export class Info extends Model<Info, InfoCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Gymnasium №1'",
    description: "School name",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example:
      "city Minsk",
    description: "School location",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  location: string;

  @ApiProperty({
    example:
      "220000, Minsk, Mira street, 1",
    description: "School address",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  adress: string;

  @ApiProperty({
    example:
      "+375 214 52-32-61S",
    description: "chool phone number",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  phone: string;

  @ApiProperty({
    example:
      "imn1@edum.by",
    description: "School email addressg",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  mail: string;
}
