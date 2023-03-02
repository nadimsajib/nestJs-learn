import { Controller,Get,Post,Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

import { LocalAuthGuard } from './local-auth-guard';

@Controller('auth')
export class AuthController {
constructor (private readonly authService:AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: Req){
        return this.authService.login(req.user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req: Req){
        return req.user;
    }
}
