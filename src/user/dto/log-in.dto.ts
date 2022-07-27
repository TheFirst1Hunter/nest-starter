import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ required: true, example: 'jhon' })
  @IsString()
  username: string;

  @ApiProperty({ required: true, example: '1d4jk4g5$EG!' })
  @IsString()
  password: string;
}
