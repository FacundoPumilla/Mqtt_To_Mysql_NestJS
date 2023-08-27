import { Controller, Get } from '@nestjs/common';

import { SensorService } from './sensor/sensor.service';
import { SensorEntity } from './sensor/entities/sensor_entity';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('HOME')
export class AppController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getAllData(): Promise<SensorEntity[]> {
    return await this.sensorService.findAll();
    // return await 'this.sensorService.findAll()';
  }
}
