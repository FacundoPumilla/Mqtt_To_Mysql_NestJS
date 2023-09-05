import { PartialType } from '@nestjs/swagger';
import { CreateDataloggerDto } from './create-datalogger.dto';

export class UpdateDataloggerDto extends PartialType(CreateDataloggerDto) {}
