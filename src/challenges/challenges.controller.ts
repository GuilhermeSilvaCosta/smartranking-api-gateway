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
import { ClientProxy } from '@nestjs/microservices';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AssingChallengeMatchDto } from './dtos/assign-challenge-match.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  private proxyService: ClientProxy;

  private readonly logger = new Logger(ChallengesController.name);

  constructor(proxyService: ProxyService) {
    this.proxyService = proxyService.getClientChallenge();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    return this.proxyService.emit('create-challenge', createChallengeDto);
  }

  @Put('/:idChallenge')
  @UsePipes(ValidationPipe)
  updateChallenge(
    @Param('idChallenge') idChallenge: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.proxyService.emit('update-challenge', {
      id: idChallenge,
      challenge: updateChallengeDto,
    });
  }

  @Delete('/:idChallenge')
  @HttpCode(204)
  deleteChallenge(@Param('idChallenge') idChallenge: string) {
    return this.proxyService.emit('delete-challenge', idChallenge);
  }

  @Get('/:idChallenge')
  getChallenge(@Param('idChallenge') idChallenge: string) {
    return this.proxyService.send('get-challenge', idChallenge);
  }

  @Get()
  searchChallenges(@Query('requester') requester: string) {
    console.log('requester', requester);
    return this.proxyService.send('search-challenges', { requester });
  }

  @Post('/:idChallenge/matches')
  assignMatch(
    @Param('idChallenge') idChallenge: string,
    @Body() assignChallengeMatchDto: AssingChallengeMatchDto,
  ) {
    return this.proxyService.emit('assign-match', {
      id: idChallenge,
      match: assignChallengeMatchDto,
    });
  }
}
