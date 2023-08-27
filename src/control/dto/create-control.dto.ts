import { ApiProperty } from '@nestjs/swagger';

export class CreateControlDto {
  @ApiProperty()
  readonly mac_address: string;

  @ApiProperty()
  readonly imei: string;

  @ApiProperty()
  readonly is_active: boolean;

  @ApiProperty()
  readonly wifi_ssid: string;

  @ApiProperty()
  readonly wifi_pass: string;
}
