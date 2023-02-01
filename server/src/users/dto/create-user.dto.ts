import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "student123", description: "Unique username" })
  readonly username: string;

  @ApiProperty({ example: "123qwerty123", description: "Username password" })
  readonly password: string;

  @ApiProperty({ example: "Daria", description: "First name user" })
  readonly firstName: string;

  @ApiProperty({ example: "Bukina", description: "Last name user" })
  readonly lastName: string;
}
