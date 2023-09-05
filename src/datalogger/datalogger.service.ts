import { Injectable } from '@nestjs/common';
import { CreateDataloggerDto } from './dto/create-datalogger.dto';
import { UpdateDataloggerDto } from './dto/update-datalogger.dto';
import { InitDataloggerDto } from './dto/init-datalogger.dto';
import { MqttResponseDto } from 'src/control/dto/mqtt-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { MqttService } from 'src/mqtt/mqtt.service';
import { DataloggerEntity } from './entities/datalogger.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DataloggerService {
  constructor(
    @InjectRepository(DataloggerEntity)
    private dataloggerService: Repository<DataloggerEntity>,
    private mqttService: MqttService,
  ) {}

  async findOneDataloggerByMac(mac: string): Promise<DataloggerEntity> {
    try {
      return await this.dataloggerService.findOne({
        where: { mac_address: mac },
      });
    } catch (error) {
      throw new TypeORMError(`Error del servicio: ${error}`);
    }
  }

  async findDataloggerToResponseMqtt(json: InitDataloggerDto) {
    try {
      let response: MqttResponseDto = {
        date: '0',
        wi_u: '',
        wi_p: '',
        pe_r: 5,
        status: false,
        tok: '',
      };

      const datalogger = await this.findOneDataloggerByMac(json.mac);

      if (!datalogger) {
        console.log(`El Datalogger MQTT -> ${json.mac} no existe en DB`);
      } else if (datalogger.is_active) {
        const date = Math.floor(Date.now() / 1000) + 10;
        const token = bcrypt.hashSync(json.mac, 10);
        response = {
          date: date.toString(),
          wi_u: datalogger.wifi_ssid,
          wi_p: datalogger.wifi_pass,
          pe_r: datalogger.period_report,
          status: datalogger.is_active,
          tok: token,
        };
        console.log(`El Datalogger ${json.mac} inicio correctamente`);
      }
      const topic = process.env.TOPIC_INIT + json.mac;
      this.mqttService.mqttSendResponseJsonToControlMac(topic, response);
    } catch (error) {
      console.log(error);
    }
  }

  async create(createDataloggerDto: CreateDataloggerDto) {
    try {
      const data = this.dataloggerService.create(createDataloggerDto);
      return await this.dataloggerService.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all datalogger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datalogger`;
  }

  update(id: number, updateDataloggerDto: UpdateDataloggerDto) {
    return `This action updates a #${id} datalogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} datalogger`;
  }
}
