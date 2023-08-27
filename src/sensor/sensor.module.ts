import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from './entities/sensor_entity';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([SensorEntity]), ConfigModule, MqttModule],
  providers: [SensorService],
  controllers: [SensorController],
  exports: [SensorService],
})
export class SensorModule {}
