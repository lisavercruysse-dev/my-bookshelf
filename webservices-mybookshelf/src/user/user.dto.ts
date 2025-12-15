import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { StatusResponseDto } from 'src/status/status.dto';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9]+$/)
  userName: string;

  @IsInt()
  @Min(0)
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
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
  status: StatusResponseDto;
}
