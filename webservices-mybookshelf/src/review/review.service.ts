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
} from '../drizzle/drizzle.provider';
import { and, eq } from 'drizzle-orm';
import { reviews } from '../drizzle/schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAllReviews(userId: number): Promise<ReviewListResponseDto> {
    const items = await this.db.query.reviews.findMany({
      where: (reviews, { eq }) => eq(reviews.userId, userId),
      with: {
        book: true,
      },
    });

    if (!items)
      throw new NotFoundException('This user does not have any reviews.');

    return { items };
  }

  async getReviewsForIsbn(isbn: string): Promise<ReviewListResponseDto> {
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

  async create(
    isbn: string,
    userId: number,
    review: CreateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    const book = await this.db.query.books.findFirst({
      where: (books, { eq }) => eq(books.isbn, isbn),
    });

    if (!book) {
      throw new NotFoundException(`No book with isbn ${isbn} exists`);
    }

    const [newReview] = await this.db
      .insert(reviews)
      .values({
        ...review,
        isbn,
        userId,
        date: new Date(),
      })
      .$returningId();

    return this.getReviewById(newReview.id);
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

  async deleteReview(userId: number, id: number): Promise<void> {
    const [result] = await this.db
      .delete(reviews)
      .where(and(eq(reviews.id, id), eq(reviews.userId, userId)));
    if (result.affectedRows === 0) {
      throw new NotFoundException('No review with this id exists');
    }
  }
}
