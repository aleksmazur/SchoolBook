import { ApiProperty } from "@nestjs/swagger";

export class EditProfileDto {
  @ApiProperty({ example: "1...n", description: "ID of username" })
  readonly id: number;

  @ApiProperty({ example: "(012)345-67-89", description: "User phone number" })
  readonly phone?: string;

  // @ApiProperty({ example: "", description: "ID of username" })
  // readonly profilePic: any;
}
