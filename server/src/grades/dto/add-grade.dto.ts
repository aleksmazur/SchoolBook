import { ApiProperty } from "@nestjs/swagger";

export class AddGradeDto {
  @ApiProperty({ example: "5", description: "Subject grade" })
  readonly value: number;

  @ApiProperty({ example: "1", description: "ID of children" })
  readonly childrenId: number;

  @ApiProperty({ example: "4", description: "ID of subject" })
  readonly subjectId: number;
}
