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
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // 检查当前处理的路由是否有 skipAuth 元数据
    const skipAuth = this.reflector.get<boolean>(
      'skipAuth',
      context.getHandler(),
    );
    if (skipAuth) {
      return next.handle(); // 跳过拦截器，直接处理请求
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.headers['token'], 'headers');
    // 获取请求头中的 token
    const authHeader = request.headers['token'];
    if (!authHeader) {
      console.log('无token信息');
      throw new UnauthorizedException('Authorization header is missing');
    }

    // const token = authHeader.split(' ')[1]; // 通常格式为 'Bearer token'
    // if (!token) {
    //   throw new UnauthorizedException('Token is missing');
    // }

    try {
      // 验证并解析 token
      const user = await this.jwtService.validateToken(authHeader);
      console.log(user, 'user11');
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
