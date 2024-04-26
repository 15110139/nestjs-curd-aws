import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(this.constructor.name);
  getHello(): string {
    this.logger.log('Hello World');
    return 'Hello World!';
  }
}
