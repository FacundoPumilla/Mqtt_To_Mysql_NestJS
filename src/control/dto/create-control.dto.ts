import { ApiProperty } from '@nestjs/swagger';

export class CreateControlDto {
  @ApiProperty({ example: '1A2B3C4D5E6F' })
  readonly mac_address: string;

  @ApiProperty({ example: 1 })
  readonly is_active: boolean;
}
