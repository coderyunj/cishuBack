import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  // 生成 token
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: 'your-secret-key' });
  }
  // 解析和验证 token
  async validateToken(token: string): Promise<any> {
    try {
      // 验证并解析 token，如果无效会抛出异常
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
