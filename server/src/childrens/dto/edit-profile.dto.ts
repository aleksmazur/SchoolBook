import { ApiProperty } from "@nestjs/swagger";

export class EditProfileDto {
  @ApiProperty({ example: "1...n", description: "ID of username" })
  readonly id: number;
}
