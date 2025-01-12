import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Product extends Document {
  @ApiProperty({
    example: '63e7a5414b5f5a23e4a5d92f',
    description: 'The unique identifier of the product',
    type: String,
  })
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @ApiProperty({
    example: 'Laptop',
    description: 'The name of the product',
    type: String,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'A high-performance laptop',
    description: 'The description of the product',
    type: String,
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: 1299.99,
    description: 'The price of the product',
    type: Number,
  })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: ['63e7a5414b5f5a23e4a5d930', '63e7a5414b5f5a23e4a5d931'],
    description: 'Array of category IDs associated with the product',
    type: [String],
  })
  @Prop({ type: [Types.ObjectId], ref: 'Category', default: [] })
  categoryIds: Types.ObjectId[];

  @ApiProperty({
    example: 'https://s3.amazonaws.com/bucket-name/laptop.jpg',
    description: 'URL of the product image stored in S3',
    type: String,
  })
  @Prop()
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);