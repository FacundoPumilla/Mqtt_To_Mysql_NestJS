import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('control')
export class ControlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 50, default: 'coldmind' })
  wifi_ssid: string;

  @ApiProperty()
  @Column('varchar', { length: 50, default: 'coldmind' })
  wifi_pass: string;

  @ApiProperty()
  @Column({ default: 5 })
  period_report: number;

  @ApiProperty()
  @Column('varchar', { length: 30 })
  mac_address: string;

  @ApiProperty()
  @Column('varchar', { length: 30 })
  imei: string;

  @ApiProperty()
  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'datetime', precision: 0 })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 0 })
  update_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.control, { eager: true })
  user: UserEntity;
}
