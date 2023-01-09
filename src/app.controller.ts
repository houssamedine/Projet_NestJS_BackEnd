import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { HealtCheckStatus } from './commun/interfaces/healtcheck.interface';
import { CurrentUser } from './commun/decorators/current-decorator/current-decorator.decorator';

@Controller('healtcheck')
export class AppController {
  logger: Logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getHello(@CurrentUser() currnetUser: string): HealtCheckStatus {
    this.logger.log(`${AppController.name}-${this.getHello.name}-Request`);
    return this.appService.getHello(currnetUser);
    this.logger.log(`${AppController.name}-${this.getHello.name}-Response`);
  }
}
