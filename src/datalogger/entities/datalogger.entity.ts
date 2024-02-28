import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataloggerDataEntity } from './datalogger-data.entity';

@Entity('datalogger')
export class DataloggerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  @Column({ type: 'integer' })
  chip_id: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  flash_id: number;

  @ApiProperty()
  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'datetime', precision: 0 })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 0 })
  update_at: Date;

  @ManyToOne(() => User, (user) => user.datalogger)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToMany(() => DataloggerDataEntity, (data) => data.datalogger_id)
  data: DataloggerDataEntity[];
}
