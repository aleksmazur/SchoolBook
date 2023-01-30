import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "student123", description: "Unique username"})
  readonly username: string;
  @ApiProperty({ example: "123qwerty123", description: "Username password"})
  readonly password: string;
}