import { Controller, Get } from '@nestjs/common';

import { SensorService } from './sensor/sensor.service';
import { SensorEntity } from './sensor/sensor_entity';

@Controller()
export class AppController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getAllData(): Promise<SensorEntity[]> {
    return await this.sensorService.findAll();
    // return await 'this.sensorService.findAll()';
  }
}
