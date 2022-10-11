import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtAuthModule } from './jwt/jwt.module';
import { AuthService } from './services/auth/auth.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
