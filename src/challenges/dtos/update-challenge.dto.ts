import { IsEnum, IsOptional } from 'class-validator';

enum ChallengeStatus {
  REALIZED = 'REALIZED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCELETED = 'CANCELETED',
}

export class UpdateChallengeDto {
  @IsOptional()
  @IsEnum(ChallengeStatus)
  status: ChallengeStatus;
}
