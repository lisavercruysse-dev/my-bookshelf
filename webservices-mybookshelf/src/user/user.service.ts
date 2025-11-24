import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import {
  CreateUserRequestDto,
  UserListResponseDto,
  UserResponseDto,
} from './user.dto';
import { eq } from 'drizzle-orm';
import { users } from 'src/drizzle/schema';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAllUsers(): Promise<UserListResponseDto> {
    const items = await this.db.query.users.findMany();
    return { items };
  }

  async getUserById(id: number) {
    const item = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!item) {
      throw new NotFoundException('No user with this ID exists');
    }

    return item;
  }

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const [newUser] = await this.db.insert(users).values(user).$returningId();

    return this.getUserById(newUser.id);
  }

  async update(
    id: number,
    user: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    await this.db.update(users).set(user).where(eq(users.id, id));
    return this.getUserById(id);
  }

  async delete(id: number): Promise<void> {
    const [result] = await this.db.delete(users).where(eq(users.id, id));
    if (result.affectedRows === 0) {
      throw new NotFoundException('No user with this ID exists');
    }
  }
}
