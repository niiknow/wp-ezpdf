import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api'

class PdfJsDocument {
  private readonly document: PDFDocumentProxy;

  constructor(document: PDFDocumentProxy) {
    this.document = document
  }

  async getPageText(pageNumber: number): Promise<string> {
    const page = await this.document.getPage(pageNumber + 1);
    const content = await page.getTextContent();

    // @ts-ignore
    return content.items.map( s => s.str ).join(' ');
  }

  getNativePage(pageNumber: number): Promise<PDFPageProxy> {
    return this.document.getPage(pageNumber + 1);
  }
}

export { PdfJsDocument }
