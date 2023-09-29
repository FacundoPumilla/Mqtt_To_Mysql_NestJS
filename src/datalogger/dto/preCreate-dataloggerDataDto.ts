import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PreCreateDataloggerDataDto {
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
}
