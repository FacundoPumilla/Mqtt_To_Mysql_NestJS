import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from 'src/sensor/sensor_entity';
import { Repository } from 'typeorm';
import { Datum } from './entities/datum.entity';
import { getLimitDatumDto } from './dto/getLimitDatumDto';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorService: Repository<SensorEntity>,
  ) {}

  async findAll(dto: getLimitDatumDto): Promise<Datum[]> {
    try {
      return await this.sensorService.find({
        where: {
          mac_address: dto.mac,
        },
        take: dto.limit,
        order: {
          timestamp: dto.order,
        },
      });
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `No se encontro el ${dto.mac}`,
      });
    }
  }

  async finAllByMacAddress(mac: string) {
    return `El mac enviado es ${mac}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datum`;
  }

  update(id: number, updateDatumDto: UpdateDatumDto) {
    return `This action updates a #${id} datum`;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}
