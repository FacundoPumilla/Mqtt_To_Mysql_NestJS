import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataloggerService } from './datalogger.service';
import { CreateDataloggerDto } from './dto/create-datalogger.dto';
import { UpdateDataloggerDto } from './dto/update-datalogger.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { InitDataloggerDto } from './dto/init-datalogger.dto';
import { DataloggerDataService } from './datalogger-data.service';
import { PreCreateDataloggerDataDto } from './dto/preCreate-dataloggerDataDto';

@Controller('datalogger')
@ApiTags('datalogger')
export class DataloggerController {
  constructor(
    private readonly dataloggerService: DataloggerService,
    private readonly dataloggerDataService: DataloggerDataService,
  ) {}

  @MessagePattern('datalogger/init')
  async initDataloggerForMqtt(@Payload() json: InitDataloggerDto) {
    console.log('Entro en datalogger/Init, payload: ');
    console.log(json);
    const DataloggerEntity =
      await this.dataloggerService.initDataloggerAndResponseMqtt(json);
    console.log(DataloggerEntity);
  }

  @MessagePattern('datalogger/sendData/#')
  async receiveDataFromDatalogger(
    @Payload() payload,
    @Ctx() context: MqttContext,
  ) {
    console.log(context.getTopic());
    console.log(payload);
    const byteSize = (payload) => new Blob([payload]).size;
    console.log(byteSize(payload));
    this.createData(
      await this.dataloggerDataService.dataFromDataloggerToDto(payload),
    );
  }

  @Post('createData')
  createData(@Body() data: PreCreateDataloggerDataDto) {
    try {
      console.log(data);
      return this.dataloggerDataService.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createDataloggerDto: CreateDataloggerDto) {
    return this.dataloggerService.create(createDataloggerDto);
  }

  @Get()
  findAll() {
    return this.dataloggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataloggerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataloggerDto: UpdateDataloggerDto,
  ) {
    return this.dataloggerService.update(+id, updateDataloggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataloggerService.remove(+id);
  }
}
