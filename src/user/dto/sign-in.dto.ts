import { IsString, MinLength, Matches } from 'class-validator';

export class SignInDTO {
  @IsString()
  @MinLength(2)
  username: string;

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
