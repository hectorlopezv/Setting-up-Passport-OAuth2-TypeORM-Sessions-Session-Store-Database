import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { GoogleOAuthGuard } from 'src/auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.appService.googleLogin(req);
  }
}
