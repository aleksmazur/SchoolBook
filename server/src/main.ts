import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function run() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("School Book")
    .setDescription(
      "REST API documentation for project School Book by task RS Clone from Rolling Scopes School",
    )
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`Server started on port = ${PORT}`);
  });
}

run();
