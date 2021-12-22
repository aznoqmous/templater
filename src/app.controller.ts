import { Controller, Request, Get, Render, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('login')
  login(){
    return {}
  }

  @Post('auth/login')
  async auth(@Request() req){
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req){
    return "profile";
  }

  @Get()
  @Render('index')
  index(){
    return {
      message: "Index"
    };
  }
}
