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

  async findOneDataloggerById(uuid: string): Promise<DataloggerEntity> {
    try {
      return await this.dataloggerService.findOne({
        where: { id: uuid },
      });
    } catch (error) {
      throw new TypeORMError(`Error del servicio: ${error}`);
    }
  }
  /**
   * @Brief Busca la entidad DataLogger por mac, chipId y flashId
   * @param data InitDataloggerDto
   * @returns DataloggerEntity
   */
  async findOneDataloggerBy_Mac_Chip_Flash(
    data: InitDataloggerDto,
  ): Promise<DataloggerEntity> {
    try {
      return await this.dataloggerService.findOne({
        where: {
          mac_address: data.mac,
          chip_id: data.chip,
          flash_id: data.flash,
        },
      });
    } catch (error) {
      throw new TypeORMError(`Error del servicio: ${error}`);
    }
  }

  async initDataloggerAndResponseMqtt(json: InitDataloggerDto) {
    try {
      let response = new MqttResponseDto();

      const datalogger = await this.findOneDataloggerBy_Mac_Chip_Flash(json);

      if (!datalogger) {
        console.log(`El Datalogger MQTT -> ${json.mac} no existe en DB`);
      } else if (datalogger.is_active) {
        const date = Math.floor(Date.now() / 1000) + 10;

        await this.updateSsidPass(datalogger, json);
        // const token = bcrypt.hashSync(json.mac, 10);
        const token = datalogger.id;
        response = {
          date: date.toString(),
          peri: datalogger.period_report,
          stat: datalogger.is_active,
          toke: token,
        };
        console.log(`El Datalogger ${json.mac} inicio correctamente`);
      }
      const topic = process.env.TOPIC_INIT + json.mac;
      return this.mqttService.mqttSendResponseJsonToControlMac(topic, response);
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
    return `This action removes a #${id} dataloggers`;
  }

  private async updateSsidPass(
    datalogger: DataloggerEntity,
    data: InitDataloggerDto,
  ) {
    datalogger.wifi_ssid = data.ssid;
    datalogger.wifi_pass = data.pass;
    return await this.dataloggerService.save(datalogger);
  }
}
