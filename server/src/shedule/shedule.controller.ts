import { Controller, Get, Param } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { SheduleService } from "./shedule.service";

@ApiTags("Shedule")
@Controller("shedule")
export class SheduleController {
  constructor(private sheduleService: SheduleService) {}

  @ApiOperation({ summary: "Get shedule" })
  @ApiOkResponse({
    description: "We get the schedule of subjects for the current week",
  })
  @ApiNotFoundResponse({ description: "Subjects or class not found!" })
  @ApiParam({
    name: "id",
    example: "2",
    description: "The ID of the class to get the schedule for",
    required: true,
  })
  @Get(":id")
  getSheduleClass(@Param("id") id: number) {
    return this.sheduleService.getScheduleByClassId(id);
  }
}
