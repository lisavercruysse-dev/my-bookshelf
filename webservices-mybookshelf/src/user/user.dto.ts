import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsString } from 'nestjs-swagger-dto';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Id of the user' })
  @Expose()
  id!: number;

  @ApiProperty({
    example: 'bookworm42',
    description: 'The username of the user',
  })
  @Expose()
  userName!: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @Expose()
  email!: string;
}

export class UpdateUserRequestDto {
  @IsString({
    example: 'bookworm42',
    description: 'The username of the user',
    minLength: 2,
    maxLength: 255,
  })
  userName!: string;

  @IsString({
    example: 'user@example.com',
    description: 'The email of the user',
    isEmail: true,
  })
  email!: string;
}

export class UserListResponseDto {
  @ApiProperty({ type: () => [UserResponseDto] })
  items!: UserResponseDto[];
}

export class RegisterUserRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'bookworm42',
    description: 'The username of the user',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName!: string;

  @ApiProperty({
    example: 'SuperSecret123!',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
