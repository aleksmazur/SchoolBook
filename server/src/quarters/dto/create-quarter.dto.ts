import { ApiProperty } from "@nestjs/swagger";

export class CreateQuarterDto {
  @ApiProperty({ example: "2", description: "Number of quarter" })
  readonly quarter: number;

  @ApiProperty({ example: "2023-01-10", description: "Start date of quarter" })
  readonly startDate: string;

  @ApiProperty({ example: "2023-03-15", description: "End date of quarter" })
  readonly endDate: string;
}
