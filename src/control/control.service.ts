import { Injectable } from '@nestjs/common';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { ControlEntity } from './entities/control.entity';
import { InitControlDto } from './dto/init-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { MqttResponseDto } from './dto/mqtt-response.dto';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class ControlService {
  constructor(
    @InjectRepository(ControlEntity)
    private controlService: Repository<ControlEntity>,
    private mqttService: MqttService,
  ) {}

  create(createControlDto: CreateControlDto) {
    try {
      const newControl = new ControlEntity();
      newControl.wifi_ssid = createControlDto.wifi_ssid;
      newControl.wifi_pass = createControlDto.wifi_pass;
      newControl.mac_address = createControlDto.mac_address;
      newControl.imei = createControlDto.imei;
      return this.controlService.save(newControl);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.controlService.find();
  }

  async finOneByMacAndImei(data: InitControlDto): Promise<ControlEntity> {
    try {
      return await this.controlService.findOne({
        where: {
          mac_address: data.mac,
          imei: data.imei,
        },
      });
    } catch (error) {
      throw new TypeORMError(error);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      return await this.controlService.find({
        relations: { user: true },
        where: { user: { id: userId } },
      });
    } catch (error) {
      throw new TypeORMError(
        `no se encontro controles con user id ${userId} ${error}`,
      );
    }
  }

  async findControlToResponseMqtt(json: InitControlDto) {
    try {
      let response: MqttResponseDto = {
        date: '0',
        peri: 5,
        stat: false,
        toke: '',
      };

      const control = await this.finOneByMacAndImei(json);

      if (!control) {
        console.log(`El control MQTT -> ${json.mac} no existe en el sistema`);
      } else if (control.is_active) {
        let date = Date.now();
        date = Math.floor(date / 1000) + 10;
        response = {
          date: date.toString(),
          peri: control.period_report,
          stat: control.is_active,
          toke: '',
        };
        console.log(`EL control ${control.mac_address} Init_Ok`);
      }
      this.mqttService.mqttSendResponseJsonToControlMac(json.mac, response);
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateControlDto: UpdateControlDto) {
    return `This action updates a #${id} control`;
  }

  remove(id: number) {
    return `This action removes a #${id} control`;
  }
}
