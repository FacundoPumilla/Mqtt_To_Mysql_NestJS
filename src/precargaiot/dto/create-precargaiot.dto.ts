import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePrecargaiotDto {
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  readonly mountpoint: string;

  @ApiProperty()
  @IsString()
  readonly client_id: string;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly publish_acl: string;

  @ApiProperty()
  @IsOptional()
  readonly subscribe_acl: string;
}
