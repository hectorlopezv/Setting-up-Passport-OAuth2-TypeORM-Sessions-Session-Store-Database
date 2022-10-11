import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.use(cookieParser());
  app.use(
    expressSession({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        sameSite: true,
        httpOnly: false,
      },
      secret: 'a santa at nasa',
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
    passport.initialize(),
    passport.session(),
  );
  await app.listen(3000);
}
bootstrap();
