import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Meetup API')
    .setVersion('1.0')
    .addCookieAuth('accessToken',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'accessToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('APP_PORT');

  await app.listen(PORT);
}

bootstrap();
