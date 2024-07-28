import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, RmqOptions } from '@nestjs/microservices';

@Injectable()
export class AppConfigsService {
  constructor(private configService: ConfigService) {}

  get DB_OPTIONS() {
    return this.configService.get('db');
  }

  get RABBIT_MQ_OPTIONS() {
    return this.configService.get<RmqOptions>('rabbitmq').options;
  }

  get REDIS_OPTIONS() {
    return this.configService.get<any>('redis');
  }

  get CUSTOM_OPTIONS() {
    return this.configService.get<any>('custom');
  }

  get OSS_OPTIONS() {
    return this.configService.get<any>('oss');
  }
}
