import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const ht = await NestFactory.create(AppModule);
  const configService = ht.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
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
  await app.listen();
  await ht.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
