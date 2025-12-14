const fs = require('fs');
const path = require('path');

// Function to extract text from DOCX using mammoth or manual parsing
async function extractDOCX() {
  const docxPath = path.join(__dirname, 'constants', 'questions.docx');
  
  try {
    // Try to use mammoth library
    const mammoth = require('mammoth');
    const result = await mammoth.extractRawText({ path: docxPath });
    
    const outputPath = path.join(__dirname, 'extracted_questions.txt');
    fs.writeFileSync(outputPath, result.value, 'utf8');
    
    console.log('Extracted text from DOCX:');
    console.log(result.value.substring(0, 5000));
    console.log(`\n\nFull text saved to: ${outputPath}`);
    
    // Also try to extract with formatting to detect bold text (correct answers)
    const resultWithFormatting = await mammoth.convertToHtml({ path: docxPath });
    const htmlPath = path.join(__dirname, 'extracted_questions.html');
    fs.writeFileSync(htmlPath, resultWithFormatting.value, 'utf8');
    console.log(`\nHTML with formatting saved to: ${htmlPath}`);
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' || error.message.includes('Cannot find module')) {
      console.log('Installing mammoth...');
      const { execSync } = require('child_process');
      try {
        execSync('npm install mammoth --no-save', { cwd: __dirname, stdio: 'inherit' });
        
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: docxPath });
        
        const outputPath = path.join(__dirname, 'extracted_questions.txt');
        fs.writeFileSync(outputPath, result.value, 'utf8');
        
        console.log('Extracted text from DOCX:');
        console.log(result.value.substring(0, 5000));
        console.log(`\n\nFull text saved to: ${outputPath}`);
        
        // Also extract with formatting
        const resultWithFormatting = await mammoth.convertToHtml({ path: docxPath });
        const htmlPath = path.join(__dirname, 'extracted_questions.html');
        fs.writeFileSync(htmlPath, resultWithFormatting.value, 'utf8');
        console.log(`\nHTML with formatting saved to: ${htmlPath}`);
        
      } catch (installError) {
        console.error('Failed to install or use mammoth:', installError.message);
        console.log('\n=== ALTERNATIVE: Manual extraction ===');
        console.log('1. Open questions.docx in Word');
        console.log('2. Select all text (Ctrl+A)');
        console.log('3. Copy (Ctrl+C)');
        console.log('4. Paste the text here and I will parse it');
        console.log('\nOr save as .txt file and I will read it');
      }
    } else {
      console.error('Error:', error.message);
      console.error(error.stack);
    }
  }
}

extractDOCX();


