import { StatusResponseDto } from 'src/status/status.dto';

export class CreateUserRequestDto {
  id: number;
  userName: string;
  email: string;
}

export class UserResponseDto {
  id: number;
  userName: string;
}

export class UpdateUserRequestDto extends CreateUserRequestDto {}

export class UserListResponseDto {
  items: UserResponseDto[];
}

export class CreateSavedBookDto {
  isbn: string;
  userId: number;
  pagesRead: number;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
  statusId: number;
}

export class UpdateSavedBookRequestDto extends CreateSavedBookDto {}

export class savedBookResponseDto {
  isbn: string;
  userId: number;
  pagesRead: number;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
  status: StatusResponseDto;
}
