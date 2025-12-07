import { Injectable } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import { StatusListResponseDto } from './status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<StatusListResponseDto> {
    const items = await this.db.query.statuses.findMany();
    return { items };
  }
}
