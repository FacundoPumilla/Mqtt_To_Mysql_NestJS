import { Controller } from '@nestjs/common';
import { SensorService } from './sensor.service';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { SensorDto } from './sensor_dto';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @MessagePattern('#')
  async getNotifi(@Payload() payload: SensorDto, @Ctx() context: MqttContext) {
    try {
      if (!payload.mac) {
        console.log('payload ERROR');
      } else {
        console.log(`Topico recibido: ${context.getTopic()}`);
        console.log(await this.sensorService.newDataSensor(payload));
      }
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
