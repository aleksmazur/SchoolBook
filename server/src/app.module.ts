import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";

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
      database: process.env.POSTGRES_DB || "school-book",
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
