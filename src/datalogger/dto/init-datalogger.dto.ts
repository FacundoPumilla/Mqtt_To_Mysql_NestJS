import { ApiProperty } from '@nestjs/swagger';

export class InitDataloggerDto {
  @ApiProperty()
  readonly mac: string;

  @ApiProperty()
  readonly chip: number;

  @ApiProperty()
  readonly flash: number;

  @ApiProperty()
  readonly ssid: string;

  @ApiProperty()
  readonly pass: string;
}
