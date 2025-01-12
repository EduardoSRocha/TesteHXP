import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Category extends Document {
  @ApiProperty({
    example: '63e7a5414b5f5a23e4a5d930',
    description: 'The unique identifier of the category',
    type: String,
  })
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
    type: String,
  })
  @Prop({ required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
