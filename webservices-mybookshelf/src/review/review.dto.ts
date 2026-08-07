import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { BookResponseDTO } from '../book/book.dto';

export class CreateReviewRequestDto {
  @IsString()
  @IsNotEmpty()
  body: string | null;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;
}

export class ReviewResponseDto {
  id: number;
  isbn: string;
  userId: number;
  body: string | null;
  stars: number;
  date: Date;
  book?: BookResponseDTO;
}

export class UpdateReviewRequestDto {
  @IsString()
  body: string | null;

  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;
}

export class ReviewListResponseDto {
  items: ReviewResponseDto[];
}
