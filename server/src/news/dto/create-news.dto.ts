import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
  @ApiProperty({ example: "Excursion to the 'Stalin Line'", description: "News title" })
  readonly title: string;

  @ApiProperty({
    example: "On October 2, 5th grade students went on an excursion to the memorial complex 'Stalin's Line', visited the museum of aviation technology. It was the most powerful fortified area of the Belarusian military district.",
    description: "News content",
  })
  readonly content: string;
}
