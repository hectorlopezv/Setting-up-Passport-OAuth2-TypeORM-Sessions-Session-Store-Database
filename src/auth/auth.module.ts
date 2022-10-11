import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { GoogleStrategy } from './strategy';
import { Module } from './jwt/jwt.module';
import { Module } from './jwt/service/jwt.service';

@Module({
  imports: [ConfigModule.forRoot(), Module],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
