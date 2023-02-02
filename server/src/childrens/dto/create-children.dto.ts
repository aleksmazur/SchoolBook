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
    example: "Denisovich",
    description: "Middle child name",
  })
  readonly middleName: string;

  @ApiProperty({
    example: "street Stroitelei, 12, flat 52",
    description: "Adress of child",
  })
  readonly adress: string;

  @ApiProperty({
    example: "12.01.2012",
    description: "Date of birthday"
  })
  readonly birthday: string;

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
