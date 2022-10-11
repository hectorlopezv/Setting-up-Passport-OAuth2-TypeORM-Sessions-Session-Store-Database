import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtAuthModule } from './jwt/jwt.module';
import { SessionSerializer } from './serializer/session.serializer';
import { AuthService } from './services/auth/auth.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtAuthModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
