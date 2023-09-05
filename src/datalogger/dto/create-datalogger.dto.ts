import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateDataloggerDto {
  @ApiProperty()
  @IsString()
  readonly mac_address: string;

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
