import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Order extends Document {
  @ApiProperty({
    example: '63e7a5414b5f5a23e4a5d940',
    description: 'The unique identifier of the order',
    type: String,
  })
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @ApiProperty({
    example: '2025-01-12T12:34:56.789Z',
    description: 'The date of the order',
    type: Date,
  })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({
    example: ['63e7a5414b5f5a23e4a5d92f', '63e7a5414b5f5a23e4a5d930'],
    description: 'Array of product IDs included in the order',
    type: [String],
  })
  @Prop({ type: [Types.ObjectId], ref: 'Product', required: true })
  productIds: Types.ObjectId[];

  @ApiProperty({
    example: 2599.98,
    description: 'The total amount for the order',
    type: Number,
  })
  @Prop({ required: true })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);