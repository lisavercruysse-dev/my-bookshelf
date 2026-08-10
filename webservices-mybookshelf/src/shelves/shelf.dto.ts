import { ApiProperty } from '@nestjs/swagger';
import { BookResponseDTO } from 'src/book/book.dto';
import { IsString } from 'nestjs-swagger-dto';

export class CreateShelfDto {
  @IsString({
    example: 'Favorites',
    description: 'The title of the shelf',
    maxLength: 100,
  })
  title!: string;

  @IsString({
    example: 'A shelf to keep track of all your favorite books',
    description: 'The description of the shelf',
    maxLength: 500,
  })
  description!: string;
}

export class ShelfResponseDto {
  @ApiProperty({ example: 1, description: 'Id of the shelf' })
  id!: number;

  @ApiProperty({ example: 'Favorites', description: 'The title of the shelf' })
  title!: string;

  @ApiProperty({
    example: 42,
    description: 'Id of the user who owns the shelf',
  })
  userId!: number;

  @ApiProperty({
    example: false,
    description:
      'Whether this shelf can be deleted (false for default shelves)',
  })
  canDelete!: boolean;

  @ApiProperty({
    example: 'A shelf to keep track of all your favorite books',
    description: 'The description of the shelf',
    nullable: true,
    type: 'string',
  })
  description!: string | null;
}

export class ShelfWithBooksResponseDTO extends ShelfResponseDto {
  @ApiProperty({ type: () => [BookResponseDTO] })
  books!: BookResponseDTO[];
}

export class ShelfListResponseDTO {
  @ApiProperty({ type: () => [ShelfResponseDto] })
  items!: ShelfResponseDto[];
}

export class DefaultShelfDto {
  title!: string;
  description!: string;
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
