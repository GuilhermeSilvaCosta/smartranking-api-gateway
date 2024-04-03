import { IsNotEmpty } from 'class-validator';

interface Result {
  set: string;
}

export class AssingChallengeMatchDto {
  @IsNotEmpty()
  winner: string;

  @IsNotEmpty()
  result: Array<Result>;
}
