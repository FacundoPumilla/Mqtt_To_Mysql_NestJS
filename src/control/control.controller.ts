import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { ControlEntity } from './entities/control.entity';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'El control a sido creado correctamente',
    type: ControlEntity,
  })
  create(@Body() createControlDto: CreateControlDto) {
    console.log(createControlDto);
    return this.controlService.create(createControlDto);
  }

  @Get()
  findAll() {
    return this.controlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlService.findOne(id);
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
