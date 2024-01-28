import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePrecargaiotDto } from './dto/create-precargaiot.dto';
import { UpdatePrecargaiotDto } from './dto/update-precargaiot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Precargaiot } from './entities/precargaiot.entity';
import { Repository } from 'typeorm';
import md5 from 'blueimp-md5';

@Injectable()
export class PrecargaiotService {
  constructor(
    @InjectRepository(Precargaiot)
    private precargaiotRepository: Repository<Precargaiot>,
  ) {}

  async create(createPrecargaiotDto: CreatePrecargaiotDto) {
    try {
      const { password, ...iotData } = createPrecargaiotDto;
      const data = this.precargaiotRepository.create({
        ...iotData,
        password: md5(password),
        publish_acl:
          `${process.env.MQT_ACL_CDL_PUB_DEFAULT},${process.env.MQT_ACL_CDL_SUB_DEFAULT}` +
          createPrecargaiotDto.client_id,
        subscribe_acl:
          `${process.env.MQT_ACL_CDL_SUB_DEFAULT}` +
          createPrecargaiotDto.client_id,
      });
      return await this.precargaiotRepository.save(data);
    } catch (error) {
      throw new InternalServerErrorException(console.log(error));
    }
  }

  async findAll() {
    return this.precargaiotRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} precargaiot`;
  }

  update(id: number, updatePrecargaiotDto: UpdatePrecargaiotDto) {
    return `This action updates a #${id} precargaiot`;
  }

  remove(id: number) {
    return `This action removes a #${id} precargaiot`;
  }
}
