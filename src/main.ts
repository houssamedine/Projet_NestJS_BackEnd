import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptInterceptor } from './commun/interceptors/log-intercept/log-intercept.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  //configuration de ficher .ENV
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT') || 5000;
  const host = configService.get('APP_HOST');

  // app.useGlobalFilters();
  app.setGlobalPrefix('api/v0');

  //
  app.useGlobalInterceptors(new LogInterceptInterceptor());
  
  //
  app.enableCors({
    origin: '*',
    // origin: ['http://localhost:4200','http://localhost:3500'],
  });

  //
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //
  await app.listen(port, host, async () => {
    console.log(`strating in : ${await app.getUrl()}`);
  });
}
bootstrap();
