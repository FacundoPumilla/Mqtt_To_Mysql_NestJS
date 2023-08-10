import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlEntity } from './entities/control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlEntity])],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
