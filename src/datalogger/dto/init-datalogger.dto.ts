import { ApiProperty } from '@nestjs/swagger';

export class InitDataloggerDto {
  @ApiProperty()
  readonly mac: string;
}
