import { forwardRef, Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ShelfController } from './shelf.controller';
import { ShelfService } from './shelf.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AuthModule)],
  controllers: [ShelfController],
  providers: [ShelfService],
  exports: [ShelfService],
})
export class ShelfModule {}
