import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    example: "teacher",
    description: "Value of user role",
    enum: ["teacher", "parent"],
  })
  readonly value: string;
  @ApiProperty({
    example: "Teacher role",
    description: "Description of user role",
  })
  readonly description: string;
}
