import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AssingChallengeMatchDto } from './dtos/assign-challenge-match.dto';

@Injectable()
export class ChallengesService {
  private proxyService: ClientProxy;

  constructor(proxyService: ProxyService) {
    this.proxyService = proxyService.getClientChallenge();
  }

  createChallenge(createChallengeDto: CreateChallengeDto) {
    return this.proxyService.emit('create-challenge', createChallengeDto);
  }

  updateChallenge(idChallenge: string, updateChallengeDto: UpdateChallengeDto) {
    return this.proxyService.emit('update-challenge', {
      id: idChallenge,
      challenge: updateChallengeDto,
    });
  }

  deleteChallenge(idChallenge: string) {
    return this.proxyService.emit('delete-challenge', idChallenge);
  }

  getChallenge(idChallenge: string) {
    return this.proxyService.send('get-challenge', idChallenge);
  }

  searchChallenges(requester: string) {
    return this.proxyService.send('search-challenges', { requester });
  }

  assignMatch(
    idChallenge: string,
    assignChallengeMatchDto: AssingChallengeMatchDto,
  ) {
    return this.proxyService.emit('assign-match', {
      id: idChallenge,
      match: assignChallengeMatchDto,
    });
  }
}
