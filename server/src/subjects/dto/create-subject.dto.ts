import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
  @ApiProperty({ example: "Mathematics", description: "Subject name" })
  readonly name: string;

  @ApiProperty({
    example: "Complete exercise number 1",
    description: "Homework context (or null)",
  })
  readonly homework?: string;

  @ApiProperty({
    example: "5",
    description: "The class to which the item belongs",
  })
  readonly classId: number;

  @ApiProperty({
    example: "2023-02-06 08:45",
    description: "Date of the subject",
  })
  readonly date: string;

  @ApiProperty({
    example: "2",
    description: "Number of quarter",
  })
  readonly quarter: number;
}
