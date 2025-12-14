const fs = require('fs');
const path = require('path');

// Try to use pdf-parse if available, otherwise provide instructions
async function extractPDF() {
  const pdfPath = path.join('E:', 'cursor', 'Додаток до наказу 1802 (Перелік питань) (1).pdf');
  
  // Clear require cache
  delete require.cache[require.resolve('pdf-parse')];
  
  try {
    // Try to require pdf-parse
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    const outputPath = path.join('E:', 'cursor', 'extracted_questions.txt');
    fs.writeFileSync(outputPath, data.text, 'utf8');
    
    console.log('Extracted text:');
    console.log(data.text.substring(0, 5000));
    console.log(`\n\nFull text saved to: ${outputPath}`);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message.includes('Cannot find module')) {
      console.log('Installing pdf-parse...');
      const { execSync } = require('child_process');
      try {
        execSync('npm install pdf-parse --no-save', { cwd: __dirname, stdio: 'inherit' });
        // Clear cache and retry
        delete require.cache[require.resolve('pdf-parse')];
        const pdfParse = require('pdf-parse');
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        
        const outputPath = path.join('E:', 'cursor', 'extracted_questions.txt');
        fs.writeFileSync(outputPath, data.text, 'utf8');
        
        console.log('Extracted text:');
        console.log(data.text.substring(0, 5000));
        console.log(`\n\nFull text saved to: ${outputPath}`);
      } catch (installError) {
        console.error('Failed to install or use pdf-parse:', installError.message);
        console.log('\nPlease manually extract text from PDF or provide it in text format.');
      }
    } else {
      console.error('Error:', error.message);
      console.error(error.stack);
    }
  }
}

extractPDF();

