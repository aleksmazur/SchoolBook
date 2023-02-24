import { ApiProperty } from "@nestjs/swagger";

export class CreateGradeDto {
  @ApiProperty({ example: "5", description: "Subject grade" })
  readonly value: number;

  @ApiProperty({ example: "1", description: "Child ID" })
  readonly childrenId: number;

  @ApiProperty({ example: "4", description: "Subject ID" })
  readonly subjectId: number;
}
