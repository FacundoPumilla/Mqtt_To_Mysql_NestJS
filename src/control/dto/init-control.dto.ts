import { ApiProperty } from '@nestjs/swagger';

export class InitControlDto {
  @ApiProperty()
  readonly mac: string;
  @ApiProperty()
  readonly imei: string;
}
