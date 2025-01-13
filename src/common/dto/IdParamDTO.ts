import { IsMongoId } from 'class-validator';

export class IdParamDto {
  @IsMongoId({ message: 'The provided ID is not a valid MongoDB ObjectId.' })
  id: string;
}
