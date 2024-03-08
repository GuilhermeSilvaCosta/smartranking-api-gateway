import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ProxyService {
  private clientAdmin: ClientProxy;

  constructor() {
    this.clientAdmin = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'admin',
      },
    });
  }

  emit(pattern: any, data: any): Observable<any> {
    return this.clientAdmin.emit(pattern, data);
  }

  send(pattern: any, data: any): Observable<any> {
    console.log(pattern, data);
    return this.clientAdmin.send(pattern, data);
  }
}
