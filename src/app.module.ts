import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { REDIS } from './redis/redis.constants';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, UsersModule, PrismaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: any) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          saveUninitialized: false,
          resave: false,
          secret: 'secret',
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
