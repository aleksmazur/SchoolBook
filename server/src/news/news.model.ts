import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NewsCreationAttrs {
  title: string;
  content: string;
  image: string;
}

@Table({ tableName: "news", updatedAt: false })
export class News extends Model<News, NewsCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Excursion to the 'Stalin Line'",
    description: "News title",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @ApiProperty({
    example:
      "On October 2, 5th grade students went on an excursion to the memorial complex 'Stalin's Line', visited the museum of aviation technology. It was the most powerful fortified area of the Belarusian military district.",
    description: "News content",
  })
  @Column({ type: DataType.TEXT, unique: false, allowNull: false })
  content: string;

  @ApiProperty({
    example:
      "ac71b42f-96f8-4b9f-9e46-8743e3f6a98b.jpg",
    description: "Image news",
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  image: string;
}
