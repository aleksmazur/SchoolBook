import { ApiProperty } from "@nestjs/swagger";

export class CreateDiarySignDto {
  @ApiProperty({ example: "1", description: "Child ID" })
  readonly childrenId: number;

  @ApiProperty({ example: "2023-03-17", description: "Date the diary was signed" })
  readonly date: string;

  @ApiProperty({ example: "true", description: "Signature status" })
  readonly sign: boolean;
}
