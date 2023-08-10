import { ApiProperty } from '@nestjs/swagger';

export class SensorDto {
  @ApiProperty()
  readonly mac: string;
  @ApiProperty()
  readonly hum: number;
  @ApiProperty()
  readonly tem: number;
  @ApiProperty()
  readonly air: number;
  @ApiProperty()
  readonly amo: number;
  @ApiProperty()
  readonly lux: number;
  @ApiProperty()
  readonly snd: number;
  @ApiProperty()
  readonly sma: number;
  @ApiProperty()
  readonly smi: number;
  @ApiProperty()
  readonly err: number;
}
