import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app_http = await NestFactory.create(AppModule, { cors: true });
  app_http.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app_http.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('MQTT Control Backend')
    .setDescription('Cliente Mqtt y despliegue de API Rest')
    .setVersion('1.1')
    .addTag('MicroServicio MQTT')
    .addBearerAuth()
    .build();

  const swagger = SwaggerModule.createDocument(app_http, config);
  SwaggerModule.setup('swagger', app_http, swagger);
  await app_http
    .listen(configService.get<number>('APP_PORT'))
    .then(() => console.log('MicroServicio HTTP en marcha'))
    .catch((error) => console.log(`Error en el servicio HTTP ${error}`));

  const app_mqtt = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: `mqtt://` + configService.get('MQTT_URL'),
        username: configService.get('MQTT_USER'),
        password: configService.get('MQTT_PASS'),
        clientId: configService.get('MQTT_ID'),
        port: configService.get<number>('MQTT_PORT'),
        reconnectPeriod: configService.get<number>('RECONNECTPERIOD'),
      },
    },
  );

  await app_mqtt
    .listen()
    .then(() => console.log('MicroServicio MQTT en marcha'))
    .catch((error) => console.log(`Error en el servicio MQTT ${error}`));
}
bootstrap();
