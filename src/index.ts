import { createMcpServer } from '@modelcontextprotocol/sdk';
import { convertToPdf } from './converter';

createMcpServer({
  convert: async ({ html, options = {} }: { html: string; options?: any }) => {
    const pdf = await convertToPdf(html, options);
    return { pdf: Buffer.from(pdf).toString('base64') };
  }
}).start();
