import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // 获取请求头中的 token
    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    // 校验 token 是否有效，这里可以调用你的服务或使用 jwt 解析
    const isValidToken = this.validateToken(token);

    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }

    // 如果 token 有效，继续处理请求
    return next.handle().pipe(
      tap(() => {
        console.log('Request passed through the AuthInterceptor');
      }),
    );
  }

  validateToken(token: string): boolean {
    // 这里写你自己的 token 校验逻辑
    // 例如解析 JWT，检查过期时间，或在数据库中查找 token 等
    return token === 'valid-token'; // 示例: 假设 'valid-token' 是一个有效 token
  }
}
