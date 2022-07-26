import { IsString, Min, Matches } from 'class-validator';

export class SignInDTO {
  @IsString()
  @Min(2)
  username: string;

  @IsString()
  @Min(8)
  @Matches(/(?i)^(?=[a-z])(?=.*[0-9])([a-z0-9!@#$%^&*()_?+-=])$/, {
    message:
      'password requires at least two lowercase letters, two uppercase letters, two digits, and two special characters. There must be a minimum of 9 characters total, and no white space characters are allowed.',
  })
  password: string;
}
