import { PartialType } from '@nestjs/mapped-types';
import { CreateControlDto } from './create-control.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateControlDto extends PartialType(CreateControlDto) {
  @ApiProperty()
  readonly period_report: number;
}
