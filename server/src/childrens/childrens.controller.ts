import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Children } from "./childrens.model";
import { ChildrensService } from "./childrens.service";
import { CreateChildrenDto } from "./dto/create-children.dto";

@ApiTags("Childrens")
@Controller("childrens")
export class ChildrensController {
  constructor(private childrenService: ChildrensService) {}

  @ApiOperation({ summary: "Create a children" })
  @ApiResponse({ status: 200, type: Children })
  @Post()
  create(@Body() dto: CreateChildrenDto) {
    return this.childrenService.createChildren(dto);
  }

  @ApiOperation({ summary: "Get all childrens" })
  @ApiResponse({ status: 200, type: [Children] })
  @ApiQuery({ name: "parent", required: false })
  @Get()
  getAll(@Query("parent") parentId?: number) {
    if (parentId) {
      return this.childrenService.getChildrensByParent(parentId);
    }
    return this.childrenService.getAllChildrens();
  }
}
