import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserChildrens } from "../users/dto/user-childrens.model";
import { UsersModule } from "../users/users.module";
import { User } from "../users/users.model";
import { ChildrensController } from "./childrens.controller";
import { Children } from "./childrens.model";
import { ChildrensService } from "./childrens.service";

@Module({
  controllers: [ChildrensController],
  providers: [ChildrensService],
  imports: [
    SequelizeModule.forFeature([Children, User, UserChildrens]),
    forwardRef(() => UsersModule),
  ],
  exports: [ChildrensService],
})
export class ChildrensModule {}