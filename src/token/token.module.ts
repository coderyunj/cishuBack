import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // 请使用一个复杂的密钥并在环境变量中配置
      signOptions: { expiresIn: '1h' }, // token 过期时间
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class tokenModule {}
