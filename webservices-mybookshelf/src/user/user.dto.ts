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
  status: string;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
}

export class UpdateSavedBookRequestDto extends CreateSavedBookDto {}

export class savedBookResponseDto extends CreateSavedBookDto {}
