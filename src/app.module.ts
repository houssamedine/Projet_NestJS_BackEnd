import { DatabaseService } from './commun/config/database/database.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SecondMiddlewareMiddleware } from './commun/middleware/second-middleware/second-middleware.middleware';
import { LoggerMiddlewareMiddleware } from './commun/middleware/logger-middleware/logger-middleware.middleware';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { RateLimiterModule } from 'nestjs-rate-limiter/dist/rate-limiter.module';
import { rateLimiterConfig } from './commun/config/rate-limiter/rate-limiter.config';
import { RateLimiterGuard } from 'nestjs-rate-limiter/dist/rate-limiter.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './commun/config/database/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    //Variable .ENV
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '',
    }),

    //user Module
    UsersModule,

    //Rate-Limiter
    RateLimiterModule.register(rateLimiterConfig),

    //Base Donnée
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),

    DatabaseModule,

    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Helmet
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('');

    //Morgan
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('');

    //Logger
    // consumer.apply(SecondMiddlewareMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
    // consumer.apply(LoggerMiddlewareMiddleware).forRoutes('');
    // consumer.apply(LoggerMiddlewareMiddleware,SecondMiddlewareMiddleware).forRoutes('');
    // consumer.apply(SecondMiddlewareMiddleware).forRoutes('');
    // .forRoutes('users');
  }
}
