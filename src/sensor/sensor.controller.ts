import { Controller } from '@nestjs/common';
import { SensorService } from './sensor.service';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { SensorDto } from './dto/sensor_dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('sensor')
@ApiTags('DataAfterInit')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @MessagePattern('#')
  async getNotifi(@Payload() payload: SensorDto, @Ctx() context: MqttContext) {
    try {
      if (!payload.mac) {
        console.log(payload);
      } else {
        console.log(`Topico recibido : ${context.getTopic()}`);
        console.log(payload);
        //this.sensorService.responseMqttControl(`Control_${context.getTopic()}`);
      }
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
