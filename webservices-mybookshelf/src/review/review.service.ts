import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateReviewRequestDto,
  ReviewListResponseDto,
  ReviewResponseDto,
  UpdateReviewRequestDto,
} from './review.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import { and, eq } from 'drizzle-orm';
import { reviews } from 'src/drizzle/schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}
  /*
  async getAllReviews(): Promise<ReviewListResponseDto> {
    const items = await this.db.query.reviews.findMany();
    return { items };
  }
*/
  async getReviewsByIsbn(isbn: string): Promise<ReviewListResponseDto> {
    const items = await this.db.query.reviews.findMany({
      where: eq(reviews.isbn, isbn),
      with: {
        book: true,
        user: true,
      },
    });
    if (items.length === 0) {
      throw new NotFoundException('No reviews for this ISBN exist');
    }
    return { items };
  }

  async getReviewById(id: number): Promise<ReviewResponseDto> {
    const item = await this.db.query.reviews.findFirst({
      where: eq(reviews.id, id),
      with: {
        book: true,
        user: true,
      },
    });

    if (!item) {
      throw new NotFoundException('No review with this ID exists');
    }
    return item;
  }

  async getReviewsByUserId(id: number): Promise<ReviewListResponseDto> {
    const items = await this.db.query.reviews.findMany({
      where: eq(reviews.userId, id),
      with: {
        book: {
          with: {
            userBooks: true,
          },
        },
      },
    });

    return { items };
  }

  async create(review: CreateReviewRequestDto): Promise<ReviewResponseDto> {
    const [newReview] = await this.db
      .insert(reviews)
      .values({
        ...review,
        date: new Date(),
      })
      .$returningId();

    return this.getReviewById(newReview.id);
  }

  async update(
    id: number,
    review: UpdateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    const [result] = await this.db
      .update(reviews)
      .set(review)
      .where(eq(reviews.id, id));
    if (result.affectedRows === 0) {
      throw new NotFoundException('No review with this ID exists');
    }
    return this.getReviewById(id);
  }

  async delete(id: number, userId: number): Promise<void> {
    const [result] = await this.db
      .delete(reviews)
      .where(and(eq(reviews.id, id), eq(reviews.userId, userId)));
    if (result.affectedRows === 0) {
      throw new NotFoundException('No review with this id exists');
    }
  }
}
