import { Module } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'POSTGRES_DB',
      useFactory: () =>
        new Kysely({
          dialect: new PostgresDialect({
            pool: new Pool({
              database: 'tunnel',
              host: 'localhost',
              user: 'user',
              password: 'password',
            }),
          }),
        }),
    },
  ],
  exports: ['POSTGRES_DB'],
})
export class PostgresDBModule {}
