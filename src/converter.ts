import puppeteer from 'puppeteer';

export class PDFConverter {
  async convert(html: string, options: any = {}) {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      return await page.pdf({
        format: options.format || 'A4',
        margin: options.margin || {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        },
        printBackground: true
      });
    } finally {
      await browser.close();
    }
  }
}
