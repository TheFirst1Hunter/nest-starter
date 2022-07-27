import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({ required: true, example: 'jhon' })
  @IsString()
  @MinLength(2)
  username: string;

  @ApiProperty({ required: true, example: '1d4jk4g5$EG!' })
  @IsString()
  @MinLength(8)
  @Matches(
    /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    {
      message:
        'password requires Minimum 8 characters, At least 1 upper case English letter, At least 1 lower case English letter, At least 1 letter,At least 1 special character.',
    },
  )
  password: string;
}
