import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleOAuthGuard } from 'src/auth/guards';
import { JwtAuthService } from 'src/auth/jwt/service/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    res.redirect(301, '/');
    return req.user;
  }
}
