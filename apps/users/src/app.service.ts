import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@libs/types';

@Injectable()
export class AppService {
  private users: CreateUserDto[] = [
    { username: 'john', password: 'changeme' },
    { username: 'maria', password: 'guess' },
  ];

  getUserById(id: number) {
    return this.users[id] ?? null;
  }

  getHello() {
    return 'Hello World!';
  }
}
