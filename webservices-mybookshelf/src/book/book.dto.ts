import { IsNotEmpty, IsInt, IsString, MaxLength, Min } from 'class-validator';
import { ReviewResponseDto } from 'src/review/review.dto';

export class CreateBookRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  isbn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  genre: string;

  @IsInt()
  @Min(0)
  pageCount: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  imageLink: string | null;
}
export class BookResponseDTO extends CreateBookRequestDTO {}

export class BookResponseListDTO {
  items: BookResponseDTO[];
}

export class BookWithReviewResponseDto extends BookResponseDTO {
  reviews: ReviewResponseDto[];
}
