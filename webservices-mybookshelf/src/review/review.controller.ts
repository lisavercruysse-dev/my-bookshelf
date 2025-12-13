import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateReviewRequestDto,
  ReviewResponseDto,
  UpdateReviewRequestDto,
} from './review.dto';
import { ReviewService } from './review.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  /*@Get()
  async getAllReviews(): Promise<ReviewListResponseDto> {
    return await this.reviewService.getAllReviews();
  }
*/

  @Get(':id')
  async getReviewById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.getReviewById(id);
  }

  @Post()
  async createReview(
    @Body() createReviewDto: CreateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.create(createReviewDto);
  }

  @Put(':id')
  async updateReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.update(id, updateReviewDto);
  }
}
