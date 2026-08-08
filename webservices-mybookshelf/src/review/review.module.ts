import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DrizzleModule, AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
