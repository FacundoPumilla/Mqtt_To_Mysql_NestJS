import { ApiProperty } from '@nestjs/swagger';

export class MqttResponseDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  wi_u: string;

  @ApiProperty()
  wi_p: string;

  @ApiProperty()
  pe_r: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  tok: string;
}
