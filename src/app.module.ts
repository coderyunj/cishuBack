import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型名称
      host: 'localhost', // 地址，这里是本机回环地址
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: 'root', // 用户密码
      database: 'nestTest', //数据库名称,需要已经建立的数据库
      // 从当前目录及其子目录中的所有 .entity 文件加载实体。
      // __dirname: 这是当前文件的目录。
      // '/**/*.entity{.ts,.js}': 这是一个 glob 模式，用于匹配当前目录及其子目录中的所有 .entity 结尾的文件，
      // 无论它们是 .ts（TypeScript）还是 .js（JavaScript）格式。
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 自动同步数据库
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
