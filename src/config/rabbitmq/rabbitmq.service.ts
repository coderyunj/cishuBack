import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { CustomLoggerService } from 'src/common/customLogger.service';

@Injectable()
export class RabbitmqService {
  private exchange: string;

  constructor(
    private configService: ConfigService,
    private amqp: AmqpConnection,
  ) {
    this.exchange = configService.get('rabbitmq').options.exchange;
  }

  async publish(routeKey: string, id: number) {
    console.log('发送消息正常', this.exchange);
    this.amqp
      .publish(this.exchange, routeKey, {
        pattern: routeKey,
        data: id,
      })
      .catch((e) => {
        console.log(e, '发送消息失败');
        // this.logger.error(String(id), `publish failed:  ${e}`);
      });
  }
}
