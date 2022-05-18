import { Injectable } from '@nestjs/common';

import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class CrawlerService {
  public async test(): Promise<void> {
    const wsChromeEndpointurl =
      'ws://127.0.0.1:9222/devtools/browser/2995ea71-b6c9-4d85-a142-4c5eb701d2a0';

    const browser = await puppeteer.connect({
      browserWSEndpoint: wsChromeEndpointurl,
      defaultViewport: {
        height: 1000,
        width: 2000,
      },
    });

    const newPage = await browser.newPage();

    await newPage.goto(
      'https://novus.ua/moloko-suhe-shvid-prigot-mlekovita-250g.html',
    );

    const data = await newPage.evaluate(() => {
      console.log('evaluate');

      window.addEventListener('click', (e) => {
        e.preventDefault();

        console.log((e.target as HTMLElement).parentElement);
        console.log((e.target as HTMLElement).parentNode);
      });

      return document.querySelector('html').innerHTML;
    });

    const photo = await newPage.screenshot();

    fs.writeFileSync('photo.pdf', photo);

    fs.writeFileSync('file.html', data as unknown as string);
  }
}
