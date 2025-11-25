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
