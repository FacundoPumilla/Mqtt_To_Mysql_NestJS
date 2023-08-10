import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Datum } from './entities/datum.entity';
import { getLimitDatumDto } from './dto/getLimitDatumDto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description:
      'Lista de datos segun mac_address, limit(default 10) y orden(default DESC)',
  })
  findAll(@Body() getDto: getLimitDatumDto): Promise<Datum[] | any> {
    return this.dataService.findAll(getDto);
  }

  // @Get(':id')
  // findOne(@Param('id') mac: string) {
  //   return this.dataService.finAllByMacAddress(mac);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatumDto: UpdateDatumDto) {
    return this.dataService.update(+id, updateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
