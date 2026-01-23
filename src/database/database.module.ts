import { Global, Module } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { Database } from './database.types';
import { KYSELY_DB } from './database.constants';

@Global()
@Module({
  providers: [
    {
      provide: KYSELY_DB,
      useFactory: async (): Promise<Kysely<Database>> => {
        const pool = new Pool({
          host: process.env.DB_HOST || 'database-2.c5c9evc5kwlh.us-east-1.rds.amazonaws.com',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '12345678',
          database: process.env.DB_NAME || 'postgres',
          max: 10,
        });

        const db = new Kysely<Database>({
          dialect: new PostgresDialect({ pool }),
        });

        return db;
      },
    },
  ],
  exports: [KYSELY_DB],
})
export class DatabaseModule {}
