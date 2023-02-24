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
import { UserChildrens } from "./users/user-childrens.model";
import { NewsModule } from "./news/news.module";
import { News } from "./news/news.model";
import { SubjectsModule } from "./subjects/subjects.module";
import { Subject } from "./subjects/subjects.model";
import { GradesModule } from "./grades/grades.module";
import { Grade } from "./grades/grades.model";
import { SheduleModule } from "./shedule/shedule.module";
import { DiaryModule } from "./diary/diary.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { QuartersModule } from "./quarters/quarters.module";
import * as path from "path";
import { Quarter } from "./quarters/quarters.model";
import { DiarySign } from "./diary/diary_sign.model";
// import { APP_GUARD } from "@nestjs/core";
// import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { InfoModule } from './info/info.module';

@Module({
  // providers: [
  //   {
  //      provide: APP_GUARD,
  //      useClass: JwtAuthGuard,
  //   },
  // ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5632,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "root",
      database: process.env.POSTGRES_DB || "schoolbook",
      models: [
        User,
        Role,
        UserRoles,
        Children,
        ClassRoom,
        UserChildrens,
        News,
        Subject,
        Grade,
        Quarter,
        DiarySign,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    ChildrensModule,
    ClassesModule,
    AuthModule,
    NewsModule,
    SubjectsModule,
    GradesModule,
    SheduleModule,
    DiaryModule,
    FilesModule,
    QuartersModule,
    InfoModule,
  ],
})
export class AppModule {}
