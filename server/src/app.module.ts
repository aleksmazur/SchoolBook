import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { ChildrensModule } from "./childrens/childrens.module";
import { Children } from "./childrens/childrens.model";
import { ClassesModule } from "./classes/classes.module";
import { ClassRoom } from "./classes/classes.model";
import { AuthModule } from "./auth/auth.module";
import { UserChildrens } from "./users/dto/user-childrens.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5632,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "root",
      database: process.env.POSTGRES_DB || "schoolbook",
      models: [User, Role, UserRoles, Children, ClassRoom, UserChildrens],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    ChildrensModule,
    ClassesModule,
    AuthModule,
  ],
})
export class AppModule {}
