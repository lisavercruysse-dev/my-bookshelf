import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';
import { ReviewResponseDto } from 'src/review/review.dto';
import { IsString, IsNumber } from 'nestjs-swagger-dto';

export class CreateBookRequestDTO {
  @IsString({
    example: '9781444775827',
    description: 'The ISBN of the book',
    maxLength: 20,
  })
  isbn!: string;

  @IsString({
    example: 'A man called Ove',
    description: 'The title of the book',
    maxLength: 100,
  })
  title!: string;

  @IsString({
    example: 'Literary fiction',
    description: 'The genre of the book',
    maxLength: 100,
  })
  genre!: string;

  @IsNumber({
    name: 'pageCount',
    description: 'The amount of pages the book has',
    min: 0,
    type: 'integer',
    format: 'int32',
  })
  @Min(0)
  pageCount!: number;

  @IsString({
    example: 'Fredrick Backman',
    description: 'The author / authors of the book',
    maxLength: 255,
  })
  author!: string;

  @IsString({
    example: 'Ove is a grumpy old man who lost his wife.',
    description: 'The description of the book',
  })
  description!: string;

  @IsString({
    example:
      'http://books.google.com/books/content?id=7zUQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    description: 'The link to the google books image',
    nullable: true,
  })
  imageLink!: string | null;
}

export class BookResponseDTO extends CreateBookRequestDTO {}

export class BookResponseListDTO {
  @ApiProperty({ type: () => [BookResponseDTO] })
  items!: BookResponseDTO[];
}

export class BookWithReviewResponseDto extends BookResponseDTO {
  @ApiProperty({ type: () => [ReviewResponseDto] })
  reviews!: ReviewResponseDto[];
}
