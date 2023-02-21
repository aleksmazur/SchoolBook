import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Children } from "./childrens.model";
import { ChildrensService } from "./childrens.service";
import { CreateChildrenDto } from "./dto/create-children.dto";
import { EditChildProfileDto } from "./dto/edit-child-profile.dto";

@ApiTags("Childrens")
@Controller("childrens")
export class ChildrensController {
  constructor(private childrenService: ChildrensService) {}

  @ApiOperation({ summary: "Create a child" })
  @ApiCreatedResponse({type: Children})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Parent or class for children not found!" })
  @Post()
  create(@Body() dto: CreateChildrenDto) {
    return this.childrenService.createChildren(dto);
  }

  @ApiOperation({ summary: "Get a list of children" })
  @ApiOkResponse({ type: [Children] })
  @ApiQuery({ name: "parent", description: "Parent ID to display its children", example: "2", required: false })
  @ApiNotFoundResponse({ description: "Children or parent not found!" })
  @Get()
  getAll(@Query("parent") parentId?: number) {
    if (parentId) {
      return this.childrenService.getChildrensByParent(parentId);
    }
    return this.childrenService.getAllChildrens();
  }

  @ApiOperation({ summary: "Get a child by ID" })
  @ApiOkResponse({ type: Children })
  @ApiNotFoundResponse({ description: "Child not found!" })
  @ApiParam({ name: "id", description: "Child ID to display information about him", example: "3", required: true })
  @Get(":id")
  getChildrenByID(@Param("id") id: number) {
    return this.childrenService.getChildren(id);
  }

  @ApiOperation({ summary: "Edit a child's profile picture" })
  @ApiOkResponse({ type: Children })
  @ApiNotFoundResponse({ description: "Child not found!" })
  @Put("/edit/profile")
  @UseInterceptors(FileInterceptor("profilePic"))
  changeProfile(@Body() dto: EditChildProfileDto, @UploadedFile() image) {
    return this.childrenService.editProfile(dto, image);
  }
}
