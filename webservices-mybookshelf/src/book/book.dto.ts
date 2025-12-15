import { IsNotEmpty, IsInt, IsString, MaxLength, Min } from 'class-validator';
import { ReviewResponseDto } from 'src/review/review.dto';
import { StatusResponseDto } from 'src/status/status.dto';

export class CreateBookRequestDto {
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
  amountPages: number;

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
