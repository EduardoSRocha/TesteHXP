
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ description: 'Description of the product' })
    @IsString()
    @IsOptional()
    description: string;
  
    @ApiProperty({ description: 'Price of the product' })
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @ApiProperty({ description: 'Category IDs associated with the product', type: [String] })
    @IsArray()
    @IsOptional()
    categoryIds: string[];
  
    @ApiProperty({ description: 'Image URL of the product' })
    @IsString()
    @IsOptional()
    imageUrl: string;
  }