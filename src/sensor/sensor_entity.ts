import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SensorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mac_address: string;

  @Column({ type: 'float' })
  humedad: number;

  @Column({ type: 'float' })
  temperatura: number;

  @Column({ type: 'float' })
  aire: number;

  @Column({ type: 'float' })
  amonio: number;

  @Column()
  lux: number;

  @Column()
  sound: number;

  @Column()
  sound_max: number;

  @Column()
  sound_min: number;

  @Column()
  error: number;
}
