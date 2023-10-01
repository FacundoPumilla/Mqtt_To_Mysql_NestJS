import { ApiProperty } from '@nestjs/swagger';
import { DataloggerEntity } from 'src/datalogger/entities/datalogger.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty()
  @Column({ type: 'simple-array', default: 'user' })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }

  @OneToMany(() => DataloggerEntity, (datalogger) => datalogger.user_id)
  datalogger: DataloggerEntity[];
}
