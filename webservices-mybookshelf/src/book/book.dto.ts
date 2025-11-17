export class CreateBookRequestDto {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
}

export class BookResponseDto extends CreateBookRequestDto {}

export class BookListResponseDto {
  items: BookResponseDto[];
}
