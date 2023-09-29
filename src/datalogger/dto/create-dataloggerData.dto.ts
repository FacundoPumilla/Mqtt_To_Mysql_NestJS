import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { DataloggerEntity } from '../entities/datalogger.entity';

export class CreateDataloggerDataDto {
  @ApiProperty()
  @IsString()
  readonly token: string;

  @ApiProperty()
  @IsNumber()
  readonly temperatura: number;

  @ApiProperty()
  @IsBoolean()
  readonly rele1: boolean;

  @ApiProperty()
  @IsNumber()
  readonly error: number;

  @ApiProperty()
  @IsObject()
  readonly datalogger_id: DataloggerEntity;
}
