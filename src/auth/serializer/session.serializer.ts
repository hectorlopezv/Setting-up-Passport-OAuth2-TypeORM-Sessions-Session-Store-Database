import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from 'src/users/services/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const userDb = await this.userService.user({ id: user.id });
    if (userDb) {
      done(null, userDb);
      return;
    }
    done(null, null);
  }
}
