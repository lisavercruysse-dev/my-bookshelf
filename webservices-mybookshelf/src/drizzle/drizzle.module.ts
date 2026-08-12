import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  type DatabaseProvider,
  DrizzleAsyncProvider,
  drizzleProvider,
  InjectDrizzle,
} from './drizzle.provider';
import path from 'node:path';
import { migrate } from 'drizzle-orm/mysql2/migrator';

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
// 👇 1
export class DrizzleModule implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(DrizzleModule.name); // 👈 2

  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  // 👇 1
  async onModuleInit() {
    this.logger.log('⏳ Running migrations...');
    // 👇 3
    await migrate(this.db, {
      migrationsFolder: path.resolve('migrations'),
    });
    this.logger.log('✅ Migrations completed!');
  }

  async onModuleDestroy() {
    await this.db.$client.end();
  }
}
