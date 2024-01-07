import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { MqttService } from './mqtt/mqtt.service';
import { MqttModule } from './mqtt/mqtt.module';
import { AuthModule } from './auth/auth.module';
import { DataloggerModule } from './datalogger/datalogger.module';
import { PrecargaiotModule } from './precargaiot/precargaiot.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      retryDelay: parseInt(process.env.DB_RETRY_DELAY),
      autoLoadEntities: true,
      synchronize: true,
    }),
    MqttModule,
    AuthModule,
    DataloggerModule,
    PrecargaiotModule,
  ],
  providers: [MqttService],
})
export class AppModule {}
