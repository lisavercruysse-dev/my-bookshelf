import { Controller, Get, Param } from '@nestjs/common';
import { ReviewListResponseDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  getAllReviews(): ReviewListResponseDto {
    return this.reviewService.getAllReviews();
  }

  @Get(':isbn')
  getReviewsByIsbn(@Param('isbn') isbn: string): ReviewListResponseDto {
    return this.reviewService.getReviewsByIsbn(isbn);
  }
}
