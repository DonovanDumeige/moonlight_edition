import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, LoginDto } from './assets/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.appService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }
}
