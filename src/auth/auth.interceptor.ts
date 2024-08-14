import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: TokenService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // 获取请求头中的 token
    const authHeader = request.headers['token'];
    if (!authHeader) {
      console.log('无token信息');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; // 通常格式为 'Bearer token'
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      // 验证并解析 token
      const user = await this.jwtService.validateToken(token);
      request.user = user; // 将解码后的用户信息存储在请求对象中
      // 如果 token 有效，继续处理请求
      return next.handle().pipe(
        tap(() => {
          console.log('token校验通过');
        }),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
