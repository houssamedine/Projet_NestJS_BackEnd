import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LogInterceptInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.getArgs();
    const handler = context.getHandler();
    const { url, method, body, params, query, originalUrl } = request[0];
    console.log({ handler, url, method, body, params, query, originalUrl });

    return next.handle().toPromise().then((data) => {
      const { statusCode } = request[0].res;
      console.log({ data, statusCode });
      return data;
    });
  }
}
