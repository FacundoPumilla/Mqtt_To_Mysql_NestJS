import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from './sensor_entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorEntity])],
  providers: [SensorService],
  controllers: [SensorController],
  exports: [SensorService],
})
export class SensorModule {}
