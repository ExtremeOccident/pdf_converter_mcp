import { createMcpServer } from '@modelcontextprotocol/sdk';
import { PDFConverter } from './converter';

interface ConvertInput {
  html: string;
  options?: {
    format?: string;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
  };
}

const server = createMcpServer({
  name: 'pdf-converter',
  version: '1.0.3',
  methods: {
    convert: {
      input: {
        type: 'object',
        required: ['html'],
        properties: {
          html: { type: 'string' },
          options: {
            type: 'object',
            properties: {
              format: { type: 'string', default: 'A4' },
              margin: {
                type: 'object',
                properties: {
                  top: { type: 'string', default: '1cm' },
                  right: { type: 'string', default: '1cm' },
                  bottom: { type: 'string', default: '1cm' },
                  left: { type: 'string', default: '1cm' }
                }
              }
            }
          }
        }
      },
      output: {
        type: 'object',
        required: ['pdf'],
        properties: {
          pdf: { type: 'string', description: 'Base64 encoded PDF' }
        }
      }
    }
  },
  handlers: {
    convert: async ({ html, options = {} }: ConvertInput) => {
      const converter = new PDFConverter();
      const pdf = await converter.convert(html, options);
      return { pdf: pdf.toString('base64') };
    }
  }
});

server.start();
