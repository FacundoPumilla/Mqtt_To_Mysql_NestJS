import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataloggerDataDto } from './dto/create-dataloggerData.dto';
import { DataloggerDataEntity } from './entities/datalogger-data.entity';
import { DataloggerService } from './datalogger.service';
import { PreCreateDataloggerDataDto } from './dto/preCreate-dataloggerDataDto';

@Injectable()
export class DataloggerDataService {
  constructor(
    @InjectRepository(DataloggerDataEntity)
    private readonly dataloggerDataService: Repository<DataloggerDataEntity>,
    private readonly dataloggerService: DataloggerService,
  ) {}

  async create(dto: PreCreateDataloggerDataDto) {
    try {
      const datalog = await this.dataloggerService.findOneDataloggerById(
        dto.token,
      );
      const data: CreateDataloggerDataDto = {
        ...dto,
        datalogger_id: datalog,
      };
      return await this.dataloggerDataService.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  async dataFromDataloggerToDto(inData: any) {
    const response: PreCreateDataloggerDataDto = {
      token: inData.tok,
      temperatura: inData.te,
      rele1: inData.r1,
      error: inData.err,
    };
    return response;
  }
}
