import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { BookResponseDTO } from '../book/book.dto';
import { UserResponseDto } from '../user/user.dto';

export class CreateReviewRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  isbn: string;

  @IsInt()
  @Min(0)
  userId: number;

  @IsString()
  @IsNotEmpty()
  body: string | null;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}

export class ReviewResponseDto {
  id: number;
  isbn: string;
  userId: number;
  body: string | null;
  stars: number;
  title: string;
  date: Date;
  user?: UserResponseDto;
  book?: BookResponseDTO;
}

export class UpdateReviewRequestDto {
  @IsString()
  body: string | null;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}

export class ReviewListResponseDto {
  items: ReviewResponseDto[];
}

export class UserReviewResponseDto {
  id: number;
  userId: number;
  body: string | null;
  stars: number;
  date: Date;
  title: string;
  book: BookResponseDTO;
}

export class UserReviewResponseListDto {
  items: UserReviewResponseDto[];
}
