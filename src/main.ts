import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptInterceptor } from './commun/interceptors/log-intercept/log-intercept.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Swagger')
    .setDescription('Api using JsonPlaceHolder')
    .setVersion('1.0')
    //.addTag('Api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  //
  await app.listen(port, host, async () => {
    console.log(`strating in : ${await app.getUrl()}`);
  });
}
bootstrap();
