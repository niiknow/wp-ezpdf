import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import * as pdfjs from 'pdfjs-dist'
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/build/pdf.worker.entry'
import 'pdfjs-dist/web/pdf_viewer.css'

interface PagesInitCallback {
  (pdfViewer: pdfjsViewer.PDFViewer): void;
}

export default async (divContainer: HTMLDivElement, pdfUrl: string, pagesInitCallback: PagesInitCallback) => {
  const pdf: PDFDocumentProxy = await pdfjs.getDocument(pdfUrl).promise
  const pdfLinkService = new pdfjsViewer.PDFLinkService();

  // @ts-ignore
  const pdfViewer = new pdfjsViewer.PDFViewer({
    container: divContainer,
    linkService: pdfLinkService
  })

  document.addEventListener('pagesinit', () => { pagesInitCallback(pdfViewer) })

  pdfLinkService.setViewer(pdfViewer);
  pdfViewer.setDocument(pdf);
  pdfLinkService.setDocument(pdf, null);
}
