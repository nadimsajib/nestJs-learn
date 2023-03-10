import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,Profile } from '../typeorm';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}