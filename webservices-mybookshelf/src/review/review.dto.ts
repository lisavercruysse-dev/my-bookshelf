import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookResponseDTO } from '../book/book.dto';
import { IsNumber, IsString, IsBoolean } from 'nestjs-swagger-dto';

export class CreateReviewRequestDto {
  @IsString({
    example: 'A beautifully written story about grief and connection.',
    description: 'The body/content of the review',
  })
  body!: string;

  @IsNumber({
    name: 'stars',
    description: 'Star rating out of 5',
    min: 1,
    max: 5,
  })
  stars!: number;

  @IsString({
    example: 'A must-read',
    description: 'The title of the review',
    minLength: 3,
    maxLength: 255,
  })
  title!: string;

  @IsBoolean({
    example: true,
    description: 'Whether the reviewer recommends this book',
  })
  recommended!: boolean;
}

export class ReviewResponseDto {
  @ApiProperty({ example: 1, description: 'Id of the review' })
  id!: number;

  @ApiProperty({
    example: '9781444775827',
    description: 'ISBN of the reviewed book',
  })
  isbn!: string;

  @ApiProperty({
    example: 42,
    description: 'Id of the user who wrote the review',
  })
  userId!: number;

  @ApiProperty({
    example: 'A beautifully written story about grief and connection.',
    description: 'The body/content of the review',
    nullable: true,
    type: 'string',
  })
  body!: string | null;

  @ApiProperty({
    example: 5,
    description: 'Star rating out of 5',
    minimum: 1,
    maximum: 5,
  })
  stars!: number;

  @ApiProperty({
    example: '2026-08-10T14:30:00.000Z',
    description: 'Date the review was posted',
  })
  date!: Date;

  @ApiProperty({
    example: true,
    description: 'Whether the reviewer recommends this book',
  })
  recommended!: boolean;

  @ApiProperty({
    example: 'A must-read',
    description: 'The title of the review',
  })
  title!: string;

  @ApiPropertyOptional({
    type: () => BookResponseDTO,
    description: 'The reviewed book',
  })
  book?: BookResponseDTO;
}

export class UpdateReviewRequestDto {
  @IsString({
    example: 'A beautifully written story about grief and connection.',
    description: 'The body/content of the review',
    nullable: true,
  })
  body!: string | null;

  @IsNumber({
    name: 'stars',
    description: 'Star rating out of 5',
    min: 1,
    max: 5,
  })
  stars!: number;

  @IsString({ example: 'A must-read', description: 'The title of the review' })
  title!: string;

  @IsBoolean({
    example: true,
    description: 'Whether the reviewer recommends this book',
  })
  recommended!: boolean;
}

export class ReviewListResponseDto {
  @ApiProperty({ type: () => [ReviewResponseDto] })
  items!: ReviewResponseDto[];
}
