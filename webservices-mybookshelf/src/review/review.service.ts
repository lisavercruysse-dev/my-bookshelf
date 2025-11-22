import { Injectable } from '@nestjs/common';
import { REVIEWS } from 'src/data/mock_data';
import { ReviewListResponseDto } from './review.dto';

@Injectable()
export class ReviewService {
  getAllReviews(): ReviewListResponseDto {
    return {
      items: REVIEWS,
    };
  }

  getReviewsByIsbn(isbn: string): ReviewListResponseDto {
    const filteredReviews = REVIEWS.filter((r) => r.isbn === isbn);
    if (filteredReviews.length === 0) {
      throw new Error('No reviews found for this ISBN');
    }
    return {
      items: filteredReviews,
    };
  }
}
