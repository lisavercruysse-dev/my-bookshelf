import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewListResponseDto } from './review.dto';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Session } from 'src/types/auth';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  async getAllReviews(
    @CurrentUser() user: Session,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getAllReviews(user.id);
  }

  /*
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.update(id, updateReviewDto);
  }*/
}
