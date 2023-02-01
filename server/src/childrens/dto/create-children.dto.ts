import { ApiProperty } from "@nestjs/swagger";

export class CreateChildrenDto {
  @ApiProperty({
    example: "Ivan",
    description: "First child name"
  })
  readonly firstName: string;

  @ApiProperty({
    example: "Petrov",
    description: "Last child name",
  })
  readonly lastName: string;
  @ApiProperty({
    example: "2",
    description: "Class ID",
  })
  readonly classId: number;

  @ApiProperty({
    example: "2",
    description: "ID of parent",
  })
  readonly parentId: number;
}
