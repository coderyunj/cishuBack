import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  // NestFactory 是一个静态类，用于创建 Nest 应用实例。它提供了几个方法来创建 HTTP 应用、微服务应用和 WebSocket 应用。
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRUD')
    .setDescription('数据库 增删查改 ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
  console.log('项目启动成功，swagger地址为http://127.0.0.1:3000/api');
}
bootstrap();
