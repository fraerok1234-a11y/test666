const fs = require('fs');
const path = require('path');

// Parse HTML and extract questions with correct answers
function parseQuestions() {
  const htmlPath = path.join(__dirname, 'extracted_questions.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract questions from HTML tables
  // Questions are in <tr><td>number</td><td>question and options</td></tr> format
  const questionRegex = /<tr><td><p>(\d+)<\/p><\/td><td><p>(.*?)<\/p><\/td><\/tr>/gs;
  const questions = [];
  
  // More comprehensive regex to match question blocks
  const fullQuestionRegex = /<tr><td><p>(\d+)<\/p><\/td><td>(.*?)<\/td><\/tr>/gs;
  
  let match;
  let questionId = 1;
  
  while ((match = fullQuestionRegex.exec(htmlContent)) !== null) {
    const number = parseInt(match[1]);
    const content = match[2];
    
    // Extract question text (before <ul>)
    const questionMatch = content.match(/<p>(.*?)<\/p>/);
    if (!questionMatch) continue;
    
    let questionText = questionMatch[1]
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Skip if it's not a question (like table headers)
    if (!questionText || questionText.length < 10) continue;
    
    // Extract options from <ul><li>...</li></ul>
    const options = [];
    const correctAnswerIndex = [];
    
    // Find all <li> elements
    const liRegex = /<li>(.*?)<\/li>/gs;
    let liMatch;
    let optionIndex = 0;
    
    while ((liMatch = liRegex.exec(content)) !== null) {
      let optionText = liMatch[1]
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      // Check if this option is wrapped in <strong> (correct answer)
      const strongMatch = liMatch[1].match(/<strong>(.*?)<\/strong>/);
      if (strongMatch) {
        // This is the correct answer
        optionText = strongMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        correctAnswerIndex.push(optionIndex);
      }
      
      if (optionText && optionText.length > 0) {
        options.push(optionText);
        optionIndex++;
      }
    }
    
    // Skip if no options found
    if (options.length === 0) continue;
    
    // If multiple correct answers or "всі відповіді правильні", handle it
    let correctAnswer = correctAnswerIndex.length > 0 ? correctAnswerIndex[0] : undefined;
    
    // Check for "всі відповіді правильні" or similar
    const allCorrectPattern = /всі відповіді правильні|всі відповіді вірні|усі відповіді правильні/i;
    if (allCorrectPattern.test(content)) {
      // Find which option contains this text
      const allCorrectIndex = options.findIndex(opt => allCorrectPattern.test(opt));
      if (allCorrectIndex !== -1) {
        correctAnswer = allCorrectIndex;
      }
    }
    
    questions.push({
      id: questionId++,
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
      category: "Митне законодавство" // Default category
    });
  }
  
  return questions;
}

// Generate TypeScript code
function generateTypeScript(questions) {
  let code = 'export const QUIZ_QUESTIONS: Question[] = [\n';
  
  questions.forEach((q, index) => {
    code += '\t{\n';
    code += `\t\tid: ${q.id},\n`;
    code += `\t\tquestion: "${q.question.replace(/"/g, '\\"')}",\n`;
    code += '\t\toptions: [\n';
    q.options.forEach((opt, optIndex) => {
      code += `\t\t\t"${opt.replace(/"/g, '\\"')}"`;
      if (optIndex < q.options.length - 1) code += ',';
      code += '\n';
    });
    code += '\t\t],\n';
    if (q.correctAnswer !== undefined) {
      code += `\t\tcorrectAnswer: ${q.correctAnswer},\n`;
    }
    code += `\t\tcategory: "${q.category}"\n`;
    code += '\t}';
    if (index < questions.length - 1) code += ',';
    code += '\n';
  });
  
  code += '];\n';
  return code;
}

// Main execution
try {
  console.log('Parsing questions from HTML...');
  const questions = parseQuestions();
  console.log(`Found ${questions.length} questions`);
  
  // Show first few questions
  console.log('\nFirst 3 questions:');
  questions.slice(0, 3).forEach(q => {
    console.log(`\nQ${q.id}: ${q.question}`);
    q.options.forEach((opt, idx) => {
      const marker = q.correctAnswer === idx ? '✓' : ' ';
      console.log(`  ${marker} ${idx}: ${opt}`);
    });
  });
  
  // Generate TypeScript
  const tsCode = generateTypeScript(questions);
  const outputPath = path.join(__dirname, 'parsed_questions.ts');
  fs.writeFileSync(outputPath, tsCode, 'utf8');
  console.log(`\n\nGenerated TypeScript code saved to: ${outputPath}`);
  console.log(`Total questions: ${questions.length}`);
  
} catch (error) {
  console.error('Error:', error.message);
  console.error(error.stack);
}



