import puppeteer from 'puppeteer';

export async function convertToPdf(html: string, options = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf(options);
  await browser.close();
  return pdf;
}
