import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AssingChallengeMatchDto } from './dtos/assign-challenge-match.dto';
import { ChallengesService } from './challenges.service';

@Controller('api/v1/challenges')
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.createChallenge(createChallengeDto);
  }

  @Put('/:idChallenge')
  @UsePipes(ValidationPipe)
  updateChallenge(
    @Param('idChallenge') idChallenge: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.updateChallenge(
      idChallenge,
      updateChallengeDto,
    );
  }

  @Delete('/:idChallenge')
  @HttpCode(204)
  deleteChallenge(@Param('idChallenge') idChallenge: string) {
    return this.challengesService.deleteChallenge(idChallenge);
  }

  @Get('/:idChallenge')
  getChallenge(@Param('idChallenge') idChallenge: string) {
    return this.challengesService.getChallenge(idChallenge);
  }

  @Get()
  searchChallenges(@Query('requester') requester: string) {
    console.log('requester', requester);
    return this.challengesService.searchChallenges(requester);
  }

  @Post('/:idChallenge/matches')
  assignMatch(
    @Param('idChallenge') idChallenge: string,
    @Body() assignChallengeMatchDto: AssingChallengeMatchDto,
  ) {
    return this.challengesService.assignMatch(
      idChallenge,
      assignChallengeMatchDto,
    );
  }
}
