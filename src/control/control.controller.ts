import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { InitControlDto } from './dto/init-control.dto';

@Controller('control')
@ApiTags('Controles')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @MessagePattern('control/init')
  initControlForMqtt(@Payload() json: InitControlDto) {
    const ControlEntity = this.controlService.findControlToResponseMqtt(json);
    console.log(`Entro en iniControlForMqtt, payload -> `);
    console.log(json);
    console.log(ControlEntity);
  }

  @Post()
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlService.create(createControlDto);
  }

  @Get()
  findAll() {
    return this.controlService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: initControlDto) {
  //   this.controlService.findControlToResponseMqtt(id);
  // }

  @Get(':id')
  findByUserId(@Param('id') id: string) {
    return this.controlService.findAllByUserId(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControlDto: UpdateControlDto) {
    return this.controlService.update(+id, updateControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlService.remove(+id);
  }
}
