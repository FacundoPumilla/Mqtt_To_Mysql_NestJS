import { Injectable } from '@nestjs/common';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ControlEntity } from './entities/control.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ControlService {
  constructor(
    @InjectRepository(ControlEntity)
    private controlRepository: Repository<ControlEntity>,
  ) {}
  async create(createControlDto: CreateControlDto): Promise<ControlEntity> {
    const newControl = ControlEntity;
    console.log(createControlDto);
    return await this.controlRepository.save(createControlDto);
  }

  findAll(): Promise<ControlEntity[]> {
    return this.controlRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} control`;
  }

  update(id: number, updateControlDto: UpdateControlDto) {
    return `This action updates a #${id} control`;
  }

  remove(id: number) {
    return `This action removes a #${id} control`;
  }
}
