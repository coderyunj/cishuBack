import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { configuration } from './config';
import { AppConfigsService } from './config/app-configs.service';
import { RabbitmqModule } from './config/rabbitmq/rabbitmq.module';
import { RmqContext } from '@nestjs/microservices';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.security'],
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型名称
      host: 'localhost', // 地址，这里是本机回环地址
      port: 20001, // 端口号
      username: 'root', // 用户名
      password: '123456', // 用户密码
      database: 'test01', //数据库名称,需要已经建立的数据库
      // 从当前目录及其子目录中的所有 .entity 文件加载实体。
      // __dirname: 这是当前文件的目录。
      // '/**/*.entity{.ts,.js}': 这是一个 glob 模式，用于匹配当前目录及其子目录中的所有 .entity 结尾的文件，
      // 无论它们是 .ts（TypeScript）还是 .js（JavaScript）格式。
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 自动同步数据库
    }),
    UserModule,
    PhotoModule,
    ProductModule,
    CategoryModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      //@ts-ignore
      useFactory: async (configService: ConfigService) => {
        console.log('链接redis');
        const redisOrtions = configService.get('redis');
        const store = await redisStore({
          socket: {
            host: redisOrtions.host,
            port: redisOrtions.port,
          },
          database: redisOrtions.database,
          password: redisOrtions.password,
          ttl: redisOrtions.ttls.default,
        });
        return {
          store: store,
        };
      },
    }),
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigsService,
    RmqContext,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
