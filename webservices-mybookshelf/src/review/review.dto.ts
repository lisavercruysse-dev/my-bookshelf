import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BookResponseDTO } from '../book/book.dto';

export class CreateReviewRequestDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  recommended: boolean;
}

export class ReviewResponseDto {
  id: number;
  isbn: string;
  userId: number;
  body: string | null;
  stars: number;
  date: Date;
  recommended: boolean;
  title: string;
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
  title: string;

  @IsBoolean()
  recommended: boolean;
}

export class ReviewListResponseDto {
  items: ReviewResponseDto[];
}
