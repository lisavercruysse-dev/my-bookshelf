import { forwardRef, Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ShelfController } from './shelf.controller';
import { ShelfService } from './shelf.service';
import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    DrizzleModule,
    forwardRef(() => BookModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [ShelfController],
  providers: [ShelfService],
  exports: [ShelfService],
})
export class ShelfModule {}
