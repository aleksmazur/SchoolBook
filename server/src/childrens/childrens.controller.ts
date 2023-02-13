import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Children } from "./childrens.model";
import { ChildrensService } from "./childrens.service";
import { CreateChildrenDto } from "./dto/create-children.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";

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

  @ApiOperation({ summary: "Get children by ID" })
  @ApiResponse({ status: 200, type: Children })
  @Get(":id")
  getChildrenByID(@Param("id") id: number) {
    return this.childrenService.getChildren(id);
  }

  @ApiOperation({ summary: "Change profile" })
  @Put("/edit/profile")
  @UseInterceptors(FileInterceptor("profilePic"))
  changeProfile(@Body() dto: EditProfileDto, @UploadedFile() image) {
    return this.childrenService.editProfile(dto, image);
  }
}
