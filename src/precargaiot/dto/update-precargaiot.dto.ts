import { PartialType } from '@nestjs/swagger';
import { CreatePrecargaiotDto } from './create-precargaiot.dto';

export class UpdatePrecargaiotDto extends PartialType(CreatePrecargaiotDto) {}
