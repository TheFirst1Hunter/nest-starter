import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryPostsDTO {
  @ApiProperty({ required: false, example: 0 })
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip: 0;

  @ApiProperty({ required: false, example: 5 })
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take: 10;

  @ApiProperty({ required: false, example: 'introduction to programming' })
  @IsString()
  @IsOptional()
  title: string;
}
