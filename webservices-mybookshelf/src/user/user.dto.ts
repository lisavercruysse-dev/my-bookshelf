import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
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

export class CreateSavedBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  isbn: string;

  @IsInt()
  @Min(0)
  userId: number;

  @IsInt()
  @Min(0)
  pagesRead: number;

  @IsBoolean()
  @IsDefined()
  favorite: boolean;

  @IsDateString()
  @IsOptional()
  dateStarted: Date | null;

  @IsDateString()
  @IsOptional()
  dateEnded: Date | null;

  @IsInt()
  @Min(1)
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
