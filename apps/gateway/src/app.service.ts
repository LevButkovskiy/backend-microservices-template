import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}

  getHello() {
    return 'Hello World!';
  }

  async getUserById(id: number) {
    return firstValueFrom(this.client.send({ cmd: 'get_user_by_id' }, id));
  }
}
