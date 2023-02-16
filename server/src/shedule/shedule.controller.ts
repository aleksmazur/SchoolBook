import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SheduleService } from "./shedule.service";

@ApiTags("Shedule")
@Controller("shedule")
export class SheduleController {
  constructor(private sheduleService: SheduleService) {}

  @ApiOperation({ summary: "Get shedule by class" })
  @Get(":id")
  getSheduleClass(@Param("id") id: number) {
    return this.sheduleService.getScheduleByClassId(id);
  }
}
