import { Module } from '@nestjs/common';
import { UserService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
