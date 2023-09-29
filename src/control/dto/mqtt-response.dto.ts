import { ApiProperty } from '@nestjs/swagger';

export class MqttResponseDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  peri: number;

  @ApiProperty()
  stat: boolean;

  @ApiProperty()
  toke: string;
}
