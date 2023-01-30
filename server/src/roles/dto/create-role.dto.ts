import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "TEACHER", description: "Value of user role"})
  readonly value: string;
  @ApiProperty({ example: "Teacher", description: "Description of user role"})
  readonly description: string;
}