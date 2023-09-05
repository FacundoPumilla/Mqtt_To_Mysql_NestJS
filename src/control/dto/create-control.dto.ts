import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateControlDto {
  @ApiProperty()
  @IsString()
  readonly mac_address: string;

  @ApiProperty()
  @IsString()
  readonly imei: string;

  @ApiProperty()
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty()
  @IsString()
  readonly wifi_ssid: string;

  @ApiProperty()
  @IsString()
  readonly wifi_pass: string;
}
