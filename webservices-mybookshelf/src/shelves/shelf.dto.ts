import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { BookResponseDTO } from 'src/book/book.dto';

export class CreateShelfDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(500)
  description: string;
}

export class ShelfResponseDto {
  id: number;
  title: string;
  userId: number;
  canDelete: boolean;
  description: string | null;
}

export class ShelfWithBooksResponseDTO extends ShelfResponseDto {
  books: BookResponseDTO[];
}

export class ShelfListResponseDTO {
  items: ShelfResponseDto[];
}

export class DefaultShelfDto {
  title: string;
  description: string;
}

export const DEFAULT_SHELVES: DefaultShelfDto[] = [
  {
    title: 'Favorites',
    description: 'A shelf to keep track of all your favorite books',
  },
  {
    title: 'Want to Read',
    description: 'A shelf to keep track of all the books you want to read',
  },
  {
    title: 'Finished',
    description: 'A shelf to keep track of all your finished books',
  },
  {
    title: 'Current Reads',
    description: 'A shelf to keep track of all of your current reads',
  },
];
