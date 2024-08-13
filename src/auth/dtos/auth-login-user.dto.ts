import { IsEmail, Matches } from 'class-validator';

export class AuthLoginUserDto {
  @IsEmail()
  email: string;

  @Matches(/ˆ(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;
}
