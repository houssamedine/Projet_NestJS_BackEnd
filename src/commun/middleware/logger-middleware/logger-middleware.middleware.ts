import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request,Response} from 'express';

@Injectable()
export class LoggerMiddlewareMiddleware
    implements NestMiddleware<Request,Response> {
  use(req: Request,
      res: Response,
      next: () => void) {
    const {originalUrl,baseUrl,params,query,body,method} = req;
    console.log('Logger-Middleware : ',{mid: "First",originalUrl,baseUrl,params,query,body,method})
    next();
  }

}
