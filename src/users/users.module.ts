import { Module } from '@nestjs/common';
import { UserService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
