import { ApiProperty } from "@nestjs/swagger";

export class CreateClassRoomDto {
  @ApiProperty({ example: "1A", description: "Class name" })
  readonly className: string;
  
  @ApiProperty({
    example: "2",
    description: "ID of teacher",
  })
  readonly classTeacherId: number;
}
