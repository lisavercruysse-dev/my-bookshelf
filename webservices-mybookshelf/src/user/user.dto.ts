export class CreateUserRequestDto {
  id: number;
  userName: string;
  email: string;
}

export class UserResponseDto extends CreateUserRequestDto {}

export class UpdateUserRequestDto extends CreateUserRequestDto {}

export class UserListResponseDto {
  items: UserResponseDto[];
}
