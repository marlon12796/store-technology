import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from 'src/config/db.config';
import * as mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/singlestore/driver';
export const DRIZZLE = Symbol('drizzle-connection');
import * as schema from './schema/schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
  ],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const connection = mysql.createPool({
          host: config.get('DB_HOST'),
          user: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
        });
        const db = drizzle(connection, { schema });
        return db;
      },
    },
  ],
  exports: [],
})
export class DrizzleModule {}
