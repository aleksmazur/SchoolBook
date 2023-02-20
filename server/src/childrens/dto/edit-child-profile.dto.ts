import { ApiProperty } from "@nestjs/swagger";

export class EditChildProfileDto {
  @ApiProperty({ example: "1...n", description: "ID of the child whose profile is being changed" })
  readonly id: number;
}
