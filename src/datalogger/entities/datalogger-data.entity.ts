import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataloggerEntity } from './datalogger.entity';

@Entity('datalogger_data')
export class DataloggerDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  temperatura: number;

  @Column()
  rele1: boolean;

  @Column({ type: 'integer' })
  error: number;

  @CreateDateColumn({ type: 'datetime', precision: 0 })
  created_at: Date;

  @ManyToOne(() => DataloggerEntity, (datalogger) => datalogger.data)
  @JoinColumn({ name: 'datalogger_id' })
  datalogger: DataloggerEntity;
}
