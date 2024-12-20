# PDF Converter MCP Server

An MCP server for converting HTML to PDF.

## Installation

```bash
npm install @mcp/pdf-converter

## Config Example

```json
{
  "mcpServers": {
    "pdf-converter": {
      "command": "npx",
      "args": [
        "-y",
        "@mcp/pdf-converter"
      ]
    }
  }
}
