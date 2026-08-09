import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { BookResponseDTO } from 'src/book/book.dto';

export class CreateShelfDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}

export class ShelfResponseDto {
  id: number;
  title: string;
  userId: number;
  canDelete: boolean;
}

export class ShelfWithBooksResponseDTO extends ShelfResponseDto {
  books: BookResponseDTO[];
}

export class ShelfListResponseDTO {
  items: ShelfResponseDto[];
}

export class DefaultShelfDto {
  title: string;
}

export const DEFAULT_SHELVES: DefaultShelfDto[] = [
  {
    title: 'Favorites',
  },
  {
    title: 'Want to Read',
  },
  {
    title: 'Finished',
  },
  {
    title: 'Current Reads',
  },
];
