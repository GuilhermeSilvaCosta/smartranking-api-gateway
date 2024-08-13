import { IsString, IsEmail, Matches, IsMobilePhone } from 'class-validator';

export class AuthRegistryUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/ˆ(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;

  @IsMobilePhone('pt-BR')
  phoneNumber: string;
}
