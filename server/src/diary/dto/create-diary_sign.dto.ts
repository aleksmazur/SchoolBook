import { ApiProperty } from "@nestjs/swagger";

export class CreateDiarySignDto {
  @ApiProperty({ example: "1", description: "ID of children" })
  readonly childrenId: number;

  @ApiProperty({ example: "2023-03-17", description: "Diary signature date" })
  readonly date: string;

  @ApiProperty({ example: "true", description: "Signature status" })
  readonly sign: boolean;
}
