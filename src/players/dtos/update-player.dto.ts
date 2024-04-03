import { IsNotEmpty } from 'class-validator';

export class UpdatePlayerDto {
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly category: string;
}
