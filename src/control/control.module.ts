import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlEntity } from './entities/control.entity';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([ControlEntity]), MqttModule],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
