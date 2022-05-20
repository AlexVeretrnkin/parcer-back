import { Injectable } from '@nestjs/common';

import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class CrawlerService {
  public async test(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        height: 1000,
        width: 2000,
      },
    });

    const newPage = await browser.newPage();

    await newPage.goto(
      'https://novus.online/product/moloko-26-agotin-pl-900g',
      {
        waitUntil: 'domcontentloaded',
      },
    );

    await newPage
      .waitForNetworkIdle({ idleTime: 400, timeout: 8000 })
      .then(async () => {
        const data = await newPage.screenshot();

        fs.writeFileSync('photot.png', data);

        const element: string = await newPage.evaluate(() => {
          const text = document.elementFromPoint(726, 442);

          const className = document.elementFromPoint(726, 442).className;

          console.log('test', className);

          return className;
        });

        const elem = await newPage.$eval(
          '.' + element.replace(' ', '.'),
          (el) => el.textContent,
        );

        console.log(elem.trim());
      });
  }
}
