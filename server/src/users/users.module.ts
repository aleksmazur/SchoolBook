import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { RolesModule } from "../roles/roles.module";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { UserChildrens } from "./dto/user-childrens.model";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { ChildrensModule } from "src/childrens/childrens.module";
import { FilesModule } from "src/files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserChildrens]),
    RolesModule,
    forwardRef(() => ChildrensModule),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
