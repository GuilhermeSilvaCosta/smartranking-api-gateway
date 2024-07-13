import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProxyService {
  private clientAdmin: ClientProxy;
  private clientChallenge: ClientProxy;
  private clientRanking: ClientProxy;

  constructor() {
    this.clientAdmin = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'admin',
      },
    });

    this.clientChallenge = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'challenge',
      },
    });

    this.clientRanking = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'ranking',
      },
    });
  }

  getClientAdmin(): ClientProxy {
    return this.clientAdmin;
  }

  getClientChallenge(): ClientProxy {
    return this.clientChallenge;
  }

  getClientRanking(): ClientProxy {
    return this.clientRanking;
  }
}
