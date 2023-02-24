import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateQuarterDto } from "./dto/create-quarter.dto";
import { Quarter } from "./quarters.model";
import { QuartersService } from "./quarters.service";

@ApiTags("Quarters")
@Controller("quarters")
export class QuartersController {
  constructor(private quartersService: QuartersService) {}

  @ApiOperation({ summary: "Create a quarter" })
  @ApiCreatedResponse({ type: Quarter })
  @Post()
  create(@Body() dto: CreateQuarterDto) {
    return this.quartersService.createQuarter(dto);
  }

  @ApiOperation({ summary: "Get all quarters" })
  @ApiOkResponse({ type: [Quarter] })
  @ApiNotFoundResponse({ description: "Quarter or quarters not found!" })
  @ApiQuery({ name: "quarter", example: "2", description: "Quarter number", required: false })
  @Get()
  getAll(@Query("quarter") quarter?: number) {
    if (quarter) {
      return this.quartersService.getQuarterByValue(quarter);
    } else {
      return this.quartersService.getAllQuarters();
    }
  }
}
