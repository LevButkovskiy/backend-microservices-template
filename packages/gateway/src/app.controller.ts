import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedType } from '@backend/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): SharedType {
    return this.appService.getHello();
  }
}
