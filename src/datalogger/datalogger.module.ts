import { Module } from '@nestjs/common';
import { DataloggerService } from './datalogger.service';
import { DataloggerController } from './datalogger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloggerEntity } from './entities/datalogger.entity';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataloggerEntity]), MqttModule],
  controllers: [DataloggerController],
  providers: [DataloggerService],
})
export class DataloggerModule {}
