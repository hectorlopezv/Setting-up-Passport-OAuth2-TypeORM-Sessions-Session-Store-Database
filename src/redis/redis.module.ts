import { Module } from '@nestjs/common';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async () => {
        const client = Redis.createClient({
          legacyMode: true,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
