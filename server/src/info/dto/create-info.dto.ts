import { ApiProperty } from "@nestjs/swagger";

export class CreateInfoDto {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  readonly id: number;

  @ApiProperty({
    example: "Gymnasium №1'",
    description: "School name",
  })
  readonly name: string;

  @ApiProperty({
    example: "city Minsk",
    description: "School location",
  })
  readonly location: string;

  @ApiProperty({
    example: "220000, Minsk, Mira street, 1",
    description: "School address",
  })
  readonly adress: string;

  @ApiProperty({
    example: "+375 214 52-32-61",
    description: "School phone number",
  })
  readonly phone: string;

  @ApiProperty({
    example: "gimn1@edum.by",
    description: "School email address",
  })
  readonly mail: string;
}
