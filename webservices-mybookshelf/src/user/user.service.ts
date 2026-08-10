import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { UserListResponseDto, UserResponseDto } from './user.dto';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<UserListResponseDto> {
    const usersList = await this.db.query.users.findMany();
    const items = usersList.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
    return { items };
  }

  async getUserById(id: number) {
    const item = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!item) {
      throw new NotFoundException('No user with this ID exists');
    }

    return plainToInstance(UserResponseDto, item, {
      excludeExtraneousValues: true,
    });
  }
}
