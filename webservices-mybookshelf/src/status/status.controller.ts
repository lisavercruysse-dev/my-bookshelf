import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusListResponseDto } from './status.dto';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async getAll(): Promise<StatusListResponseDto> {
    return this.statusService.getAll();
  }
}
