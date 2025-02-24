import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],

  imports: [DrizzleModule],
})
export class SalesModule {}
