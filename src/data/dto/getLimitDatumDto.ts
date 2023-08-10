import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class getLimitDatumDto {
  @ApiProperty()
  @IsString()
  readonly mac: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit?: number = 10;
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly order?: string = 'DESC';
}
