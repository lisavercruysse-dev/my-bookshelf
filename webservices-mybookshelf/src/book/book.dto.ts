import { ReviewResponseDto } from 'src/review/review.dto';

export class CreateBookRequestDto {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
  favoriteCount: number;
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
  status: string;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
}

export class BookDetailListDto {
  items: BookDetailResponseDto[];
}

export class BookWithReviewResponseDto extends BookResponseDto {
  reviews: ReviewResponseDto[];
}
