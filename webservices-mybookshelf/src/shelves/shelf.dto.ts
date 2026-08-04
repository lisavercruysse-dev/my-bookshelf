import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateShelfDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}

export class ShelfResponseDto {
  id: number;
  title: string;
  userId: number;
  canDelete: boolean;
}

export class ShelfListResponseDTO {
  items: ShelfResponseDto[];
}
