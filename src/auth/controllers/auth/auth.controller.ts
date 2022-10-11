import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  /**
   * Get /api/auth/login
   * this is the route the user will visit to authenticate
   */
  @Get('login')
  login() {
    return;
  }
  /**
   * Get /api/auth/redirect
   * this is the redirect URL the OAUTH2 provider will call.
   */
  @Get('redirect')
  redirect(@Res() res: Response) {
    return res.send(200);
  }
  /**
   * Get /api/auth/status
   * retrieve the auth status
   */
  @Get('status')
  status() {}

  /**
   * Get /api/auth/logout
   * logout the user, destroy the session
   */
  @Get('logout')
  logout() {}
}
