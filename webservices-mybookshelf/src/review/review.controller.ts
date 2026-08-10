import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateReviewRequestDto,
  ReviewListResponseDto,
  ReviewResponseDto,
  UpdateReviewRequestDto,
} from './review.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Session } from 'src/types/auth';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('reviews')
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  async getAllReviews(
    @CurrentUser() user: Session,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getAllReviews(user.id);
  }

  @Get(':isbn')
  async getReviewsForIsbn(
    @Param('isbn') isbn: string,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getReviewsForIsbn(isbn);
  }

  @Post(':isbn')
  async createReview(
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
    @Body() createReviewDto: CreateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.create(isbn, user.id, createReviewDto);
  }

  @Put(':id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
  ) {
    await this.reviewService.deleteReview(user.id, id);
  }
}
