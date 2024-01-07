import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrecargaiotService } from './precargaiot.service';
import { CreatePrecargaiotDto } from './dto/create-precargaiot.dto';
import { UpdatePrecargaiotDto } from './dto/update-precargaiot.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('precargaiot')
@ApiTags('pre carga datalogger')
export class PrecargaiotController {
  constructor(private readonly precargaiotService: PrecargaiotService) {}

  @Post('precargaiot')
  create(@Body() createPrecargaiotDto: CreatePrecargaiotDto) {
    return this.precargaiotService.create(createPrecargaiotDto);
  }

  @Get()
  findAll() {
    return this.precargaiotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.precargaiotService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrecargaiotDto: UpdatePrecargaiotDto,
  ) {
    return this.precargaiotService.update(+id, updatePrecargaiotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.precargaiotService.remove(+id);
  }
}
