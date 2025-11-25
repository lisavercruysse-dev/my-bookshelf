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

export class BookResponseDto extends CreateBookRequestDto {}
export class BookListResponseDto {
  items: BookResponseDto[];
}

export class BookDetailDto {
  userId: number;
  pagesRead: number;
  status: string;
  favorite: boolean;
  dateStarted: Date | null;
  dateEnded: Date | null;
  book: BookResponseDto;
}

export class BookDetailListDto {
  items: BookDetailDto[];
}

export class BookWithReviewResponseDto extends BookResponseDto {
  reviews: ReviewResponseDto[];
}
