import { ApiProperty } from '@nestjs/swagger';

export class initControlDto {
  @ApiProperty()
  readonly mac: string;
  @ApiProperty()
  readonly imei: string;
}
