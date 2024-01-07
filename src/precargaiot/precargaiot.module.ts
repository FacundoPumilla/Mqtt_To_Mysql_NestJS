import { Module } from '@nestjs/common';
import { PrecargaiotService } from './precargaiot.service';
import { PrecargaiotController } from './precargaiot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precargaiot } from './entities/precargaiot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Precargaiot])],
  controllers: [PrecargaiotController],
  providers: [PrecargaiotService],
})
export class PrecargaiotModule {}
