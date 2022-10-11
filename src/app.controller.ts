import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggedInGuard } from './auth/sessions/guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LoggedInGuard)
  @Get('protected')
  guardedRoute(@Req() req) {
    return req.session;
  }
}
