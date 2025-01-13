import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsMongoId, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: '2025-01-12T12:34:56.789Z',
    description: 'The date of the order',
    type: String,
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: ['63e7a5414b5f5a23e4a5d92f', '63e7a5414b5f5a23e4a5d930'],
    description: 'Array of product IDs included in the order',
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  productIds: string[];

  @ApiProperty({
    example: 2599.98,
    description: 'The total amount for the order',
    type: Number,
  })
  @IsNumber()
  total: number;
}
