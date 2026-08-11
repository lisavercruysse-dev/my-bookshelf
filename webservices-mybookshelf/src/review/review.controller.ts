import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Reviews')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all reviews written by the current user',
    type: ReviewListResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - this user does not have any reviews',
  })
  @Get()
  async getAllReviews(
    @CurrentUser() user: Session,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getAllReviews(user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all reviews for a book by isbn',
    type: ReviewListResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found, or the book has no reviews',
  })
  @Get(':isbn')
  async getReviewsForIsbn(
    @Param('isbn') isbn: string,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getReviewsForIsbn(isbn);
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new review for a book',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @Post(':isbn')
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
    @Body() createReviewDto: CreateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.create(isbn, user.id, createReviewDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update a review',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found',
  })
  @Put(':id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewRequestDto,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a review',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found',
  })
  @Delete(':id')
  async deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: Session,
  ) {
    await this.reviewService.deleteReview(user.id, id);
  }
}
