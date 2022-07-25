import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ required: true, example: 'an intoductoin to coding' })
  @IsString()
  title: string;

  @ApiProperty({ required: true, example: 'lorm' })
  @IsString()
  content: string;

  @ApiProperty({ required: true, example: '2534-fg234-t4tf1-435ge' })
  @IsUUID()
  authorId: string;
}
