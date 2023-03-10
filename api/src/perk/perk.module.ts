import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perk } from '../typeorm';
import { PerkService } from './perk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Perk])],
  providers: [PerkService],
  exports: [PerkService],
})
export class PerkModule {}