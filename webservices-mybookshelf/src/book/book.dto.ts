export class CreateBookRequestDto {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
  avgRating: number;
  ratingCount: number;
}

export class BookResponseDto extends CreateBookRequestDto {}

export class BookListResponseDto {
  items: BookResponseDto[];
}
