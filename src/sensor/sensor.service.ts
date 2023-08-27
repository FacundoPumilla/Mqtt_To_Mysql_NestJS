import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from './entities/sensor_entity';
import { Repository } from 'typeorm';
import { SensorDto } from './dto/sensor_dto';
import { MqttService } from 'src/mqtt/mqtt.service';
import { MqttResponseDto } from 'src/control/dto/mqtt-response.dto';
@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorService: Repository<SensorEntity>,
    private mqttService: MqttService,
  ) {}

  async responseMqttControl(macControl: string) {
    const response: MqttResponseDto = {
      date: (Math.floor(Date.now() / 1000) + 10).toString(),
      wi_u: 'gato',
      wi_p: 'fuera',
      pe_r: 5,
      status: true,
    };
    console.log(`Dentro de function  ${this.responseMqttControl.name}`);
    this.mqttService.mqttSendResponseJsonToControlMac(macControl, response);

    // const publishMqtt = mqtt.connect(this.mqtt_options);
    // let date = Date.now();
    // date = Math.floor(date / 1000) + 10;
    // const json = JSON.stringify({ date: date.toString() });
    // publishMqtt.publish(macControl, json);
  }

  async findAll(): Promise<SensorEntity[]> {
    return await this.sensorService.find({
      order: {
        id: 'DESC',
      },
      take: 5,
    });
  }

  async newDataSensor(dto: SensorDto) {
    try {
      const newData = new SensorEntity();
      newData.mac_address = dto.mac;
      newData.humedad = dto.hum;
      newData.temperatura = dto.tem;
      newData.aire = dto.air;
      newData.amonio = dto.amo;
      newData.lux = dto.lux;
      newData.sound = dto.snd;
      newData.sound_max = dto.sma;
      newData.sound_min = dto.smi;
      newData.error = dto.err;
      return await this.sensorService.save(newData);
    } catch (error) {
      throw new Error(`Error en el servicio ${error}`);
    }
  }
}
