import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'Name of the category' })
    @IsString()
    @IsNotEmpty()
    name: string;
  }