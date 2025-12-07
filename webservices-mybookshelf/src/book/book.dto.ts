import { ReviewResponseDto } from 'src/review/review.dto';
import { StatusResponseDto } from 'src/status/status.dto';

export class CreateBookRequestDto {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
}
export class UpdateBookRequestDto extends CreateBookRequestDto {}

export class BookResponseDto extends CreateBookRequestDto {
  bookDetails?: BookDetailResponseDto[];
}
export class BookListResponseDto {
  items: BookResponseDto[];
}

export class BookDetailResponseDto {
  userId: number;
  pagesRead: number;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
  status: StatusResponseDto;
}

export class BookDetailListDto {
  items: BookDetailResponseDto[];
}

export class BookWithReviewResponseDto extends BookResponseDto {
  reviews: ReviewResponseDto[];
}
