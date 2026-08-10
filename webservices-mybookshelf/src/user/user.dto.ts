import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Expose()
  email: string;
}

export class UpdateUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName: string;

  @IsString()
  @IsEmail()
  email: string;
}

export class UserListResponseDto {
  items: UserResponseDto[];
}

export class RegisterUserRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
