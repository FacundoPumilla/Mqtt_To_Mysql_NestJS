import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  const mqtt = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: configService.get<string>('MQTT_URL'),
        username: configService.get<string>('MQTT_USER'),
        password: configService.get<string>('MQTT_PASS'),
        clientId: configService.get<string>('MQTT_ID'),
        port: configService.get<number>('MQTT_PORT'),
      },
    },
  );
  await mqtt.listen();

  const config = new DocumentBuilder()
    .setTitle('MQTT CLIENT')
    .setDescription('backend for mqtt client and API Rest')
    .setVersion('1.0')
    .addTag('mqtt')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
