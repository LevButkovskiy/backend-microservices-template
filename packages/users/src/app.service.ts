import { Injectable } from '@nestjs/common';
import { SharedType } from '@backend/shared';

@Injectable()
export class AppService {
  getHello(): SharedType {
    return { id: 1, name: 'Hello World!' };
  }
}
