export class CreateReviewRequestDto {
  id: number;
  isbn: string;
  userId: number;
  body: string;
  stars: number;
  date: Date;
  title: string;
}

export class ReviewResponseDto extends CreateReviewRequestDto {}

export class UpdateReviewRequestDto {
  body: string;
  stars: number;
  title: string;
}

export class ReviewListResponseDto {
  items: ReviewResponseDto[];
}
