// Alternative PDF extraction using pdfjs-dist
const fs = require('fs');
const path = require('path');

async function extractPDF() {
  const pdfPath = path.join('E:', 'cursor', 'Додаток до наказу 1802 (Перелік питань) (1).pdf');
  
  try {
    // Try pdfjs-dist
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
    const dataBuffer = fs.readFileSync(pdfPath);
    
    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n--- Page ${i} ---\n${pageText}\n`;
    }
    
    const outputPath = path.join('E:', 'cursor', 'extracted_questions.txt');
    fs.writeFileSync(outputPath, fullText, 'utf8');
    
    console.log(`Extracted ${pdf.numPages} pages`);
    console.log('\nFirst 5000 characters:');
    console.log(fullText.substring(0, 5000));
    console.log(`\n\nFull text saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error with pdfjs-dist:', error.message);
    console.log('\n=== ALTERNATIVE: Please manually extract text ===');
    console.log('1. Open PDF in browser or Adobe Reader');
    console.log('2. Select all text (Ctrl+A)');
    console.log('3. Copy (Ctrl+C)');
    console.log('4. Paste the text here and I will parse it');
  }
}

extractPDF();




