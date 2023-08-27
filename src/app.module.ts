import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { SensorModule } from './sensor/sensor.module';
import { SensorEntity } from './sensor/entities/sensor_entity';
import { ControlModule } from './control/control.module';
import { ControlEntity } from './control/entities/control.entity';
import { MqttService } from './mqtt/mqtt.service';
import { MqttModule } from './mqtt/mqtt.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/entities/auth.entity';

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
      entities: [SensorEntity, ControlEntity, UserEntity],
      synchronize: true,
    }),
    SensorModule,
    ControlModule,
    MqttModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [MqttService],
})
export class AppModule {}
