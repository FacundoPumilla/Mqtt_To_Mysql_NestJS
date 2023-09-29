import { Module } from '@nestjs/common';
import { DataloggerService } from './datalogger.service';
import { DataloggerController } from './datalogger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloggerEntity } from './entities/datalogger.entity';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { DataloggerDataService } from './datalogger-data.service';
import { DataloggerDataEntity } from './entities/datalogger-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataloggerEntity, DataloggerDataEntity]),
    MqttModule,
  ],
  controllers: [DataloggerController],
  providers: [DataloggerService, DataloggerDataService],
})
export class DataloggerModule {}
