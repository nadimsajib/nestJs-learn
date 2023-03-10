import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmOoptions } from "./typeorm/config";
import { PerkModule } from './perk/perk.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, PerkModule, TypeOrmModule.forRoot(TypeOrmOoptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
