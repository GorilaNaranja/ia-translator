import fs from "fs";
import PDFParser from "pdf2json";
import {chatgptTranslation} from "./chatgpt.js"

export const getTextFromPdf = async () => {
  const inputPath = "./input/contrato.pdf";
  const pdfParser = new PDFParser(this, 1);

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error("ERROR on pdfParser: ", errData.parserError)
  );

  pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    const rawText = pdfParser.getRawTextContent();
    const pageBreakPattern = /----------------Page \(\d+\) Break----------------/;
    const pageBlock = rawText.split(pageBreakPattern);

    pageBlock.forEach(async (text, index) => {
      console.log(`Text for page ${index}: `, text);
      const translatedPage = await chatgptTranslation(text)
      console.log(`Translated page ${index}: `, translatedPage);
      //TODO añadir salto de pagina?
      fs.writeFile(`./output/page-${index}.txt`, translatedPage, () => {
        console.log("Output ready!");
      });
    });

  });

  pdfParser.loadPDF(inputPath);
};
