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
import { preCreateDataloggerDto } from './dto/preCreate-datalogger';

@Controller('datalogger')
@ApiTags('datalogger')
export class DataloggerController {
  constructor(
    private readonly dataloggerService: DataloggerService,
    private readonly dataloggerDataService: DataloggerDataService,
  ) {}

  @MessagePattern('datalogger/init')
  async initDataloggerForMqtt(@Payload() json: InitDataloggerDto) {
    console.log(`TOPIC: datalogger/init - ${json.mac}`);
    // console.log(json);
    const DataloggerEntity =
      await this.dataloggerService.initDataloggerAndResponseMqtt(json);
    console.log(DataloggerEntity);
  }

  @MessagePattern('datalogger/data/#')
  async receiveDataFromDatalogger(
    @Payload() payload,
    @Ctx() context: MqttContext,
  ) {
    console.log(`TOPIC: ${context.getTopic()}`);
    // console.log(payload);
    // const byteSize = (payload) => new Blob([payload]).size;
    // console.log(byteSize(payload));
    this.createData(
      await this.dataloggerDataService.dataFromDataloggerToDto(payload),
    );
  }

  @Post('createData')
  createData(@Body() data: PreCreateDataloggerDataDto) {
    try {
      // console.log(data);
      return this.dataloggerDataService.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createDataloggerDto: preCreateDataloggerDto) {
    return this.dataloggerService.create(createDataloggerDto);
  }

  @Get()
  findAll() {
    return this.dataloggerService.findAll();
  }

  @Get('/:user_id')
  findOneByUserId(@Param('user_id') id: string) {
    console.log(`el uuid recibido es ${id}`);
    return this.dataloggerService.findOneByUserId(id);
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
