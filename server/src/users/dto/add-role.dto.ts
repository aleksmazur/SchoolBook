import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "teacher|parent", description: "Value of role" })
  readonly value: string;
  
  @ApiProperty({ example: "1...n", description: "ID of username" })
  readonly userId: number;
}