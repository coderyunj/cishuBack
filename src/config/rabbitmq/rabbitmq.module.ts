import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ConfigService } from '@nestjs/config';
// import { CustomLoggerService } from 'src/common/customLogger.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigService) => {
        const rabbitmqConfig = config.get('rabbitmq').options;
        return {
          exchanges: [{ name: rabbitmqConfig.exchange, type: 'topic' }],
          uri: rabbitmqConfig.urls,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
