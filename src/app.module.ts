import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerService } from './core/parce/crawler.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CrawlerService],
})
export class AppModule {}
