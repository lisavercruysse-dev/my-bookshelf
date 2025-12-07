import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [DrizzleModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
