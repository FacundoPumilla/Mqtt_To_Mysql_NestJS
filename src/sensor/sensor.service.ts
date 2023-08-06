import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from './sensor_entity';
import { Repository } from 'typeorm';
import { SensorDto } from './sensor_dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorService: Repository<SensorEntity>,
  ) {}

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
