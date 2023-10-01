import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';

export class preCreateDataloggerDto {
  @ApiProperty()
  @IsString()
  readonly mac_address: string;

  @ApiProperty()
  @IsInt()
  readonly chip_id: number;

  @ApiProperty()
  @IsInt()
  readonly flash_id: number;

  @ApiProperty()
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty()
  @IsString()
  readonly wifi_ssid: string;

  @ApiProperty()
  @IsString()
  readonly wifi_pass: string;

  @ApiProperty()
  @IsUUID()
  readonly userId: string;
}
