import { ApiProperty } from "@nestjs/swagger";

export class CreateChildrenDto {
  @ApiProperty({
    example: "Ivan",
    description: "Child's name",
  })
  readonly firstName: string;

  @ApiProperty({
    example: "Petrov",
    description: "Surname of the child",
  })
  readonly lastName: string;

  @ApiProperty({
    example: "Denisovich",
    description: "Middle name of the child",
  })
  readonly middleName: string;

  @ApiProperty({
    example: "street Stroitelei, 12, flat 52",
    description: "Child's address",
  })
  readonly adress: string;

  @ApiProperty({
    example: "12.01.2012",
    description: "Date of birth of the child",
  })
  readonly birthday: string;

  @ApiProperty({
    example: "2",
    description: "The ID of the class the child belongs to",
  })
  readonly classId: number;

  @ApiProperty({
    example: "2",
    description: "ID of the parent the child belongs to",
  })
  readonly parentId: number;
}
