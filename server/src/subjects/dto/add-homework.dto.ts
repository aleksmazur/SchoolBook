import { ApiProperty } from "@nestjs/swagger";

export class AddHomeworkDto {
  @ApiProperty({ example: "Complete exercise number 1", description: "Homework" })
  readonly homework: string;
}
