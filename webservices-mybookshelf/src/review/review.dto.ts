import { BookResponseDto } from 'src/book/book.dto';
import { UserResponseDto } from 'src/user/user.dto';

export class CreateReviewRequestDto {
  isbn: string;
  userId: number;
  body: string | null;
  stars: number;
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
  book?: BookResponseDto;
}

export class UpdateReviewRequestDto {
  body: string | null;
  stars: number;
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
  book: BookResponseDto;
}

export class UserReviewResponseListDto {
  items: UserReviewResponseDto[];
}
