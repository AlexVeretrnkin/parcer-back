import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CrawlerService } from './core/parce/crawler.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly crawlerService: CrawlerService,
  ) {}

  @Get()
  getHello(): string {
    this.crawlerService.test();

    return this.appService.getHello();
  }
}
