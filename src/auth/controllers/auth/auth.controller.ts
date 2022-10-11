import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from 'src/auth/guards';
import { JwtAuthService } from 'src/auth/jwt/service/jwt.service';
import { LoggedInGuard } from 'src/auth/sessions/guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @UseGuards(LoggedInGuard)
  @Get('status')
  status(@Req() req) {
    return req.session;
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    console.log('accessToken', accessToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    console.log('antes de');
    req.session.destroy((err) => {
      console.log('hello');
      res.clearCookie('accessToken');
      res.clearCookie('connect.sid');
      return 'ok';
    });
  }
}
