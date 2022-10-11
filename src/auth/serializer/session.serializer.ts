import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(payload: User, done: (err: Error, user: User) => void) {
    const user = payload;
    done(null, user);
  }
}
