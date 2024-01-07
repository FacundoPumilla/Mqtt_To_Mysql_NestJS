import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('vmq_auth_acl')
export class Precargaiot {
  @ApiProperty()
  @PrimaryColumn('varchar', { length: 15 })
  mountpoint: string;

  @ApiProperty()
  @PrimaryColumn('varchar', { length: 128 })
  client_id: string;

  @ApiProperty()
  @PrimaryColumn('varchar', { length: 128 })
  readonly username: string;

  @ApiProperty()
  @Column('varchar', { length: 128 })
  readonly password: string;

  @ApiProperty()
  @Column('text')
  readonly publish_acl: string;

  @ApiProperty()
  @Column('text')
  readonly subscribe_acl: string;
}
