import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ControlEntity {
  @ApiProperty({ example: 'bcd08bd8-5ccd-41c1-8a9a-e3b5389da89c' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1A2B3C4D5E6F' })
  @Column()
  mac_address: string;

  @ApiProperty({ example: 1 })
  @Column()
  is_active: boolean;

  @ApiProperty({ example: '2023-08-08 18:11:00' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: '2023-08-08 18:11:00' })
  @UpdateDateColumn()
  updated_at: Date;
}
