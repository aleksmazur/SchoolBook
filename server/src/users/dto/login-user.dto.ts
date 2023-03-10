import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: "student123", description: "Username" })
  readonly username: string;

  @ApiProperty({ example: "123qwerty123", description: "Password" })
  readonly password: string;
}
