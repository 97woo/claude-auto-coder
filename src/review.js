import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';

// Gemini 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// GitHub 초기화
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function reviewCode() {
  const changedFiles = process.env.CHANGED_FILES?.split(' ') || [];
  const reviews = [];
  
  for (const file of changedFiles) {
    // 코드 파일만 리뷰 (js, ts, py, go 등)
    if (!file.match(/\.(js|ts|jsx|tsx|py|go|java|cpp|c|rs)$/)) {
      continue;
    }
    
    try {
      const content = await fs.readFile(file, 'utf-8');
      
      const prompt = `
        Review this code file and provide specific feedback:
        
        File: ${file}
        
        Code:
        \`\`\`
        ${content}
        \`\`\`
        
        Provide:
        1. Security issues (if any)
        2. Performance improvements
        3. Code quality suggestions
        4. Best practices violations
        
        Format your response as JSON array with:
        [{ "line": number, "comment": "suggestion", "severity": "error|warning|info" }]
      `;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      try {
        const suggestions = JSON.parse(response);
        suggestions.forEach(suggestion => {
          reviews.push({
            path: file,
            line: suggestion.line || 1,
            comment: `**[${suggestion.severity.toUpperCase()}]** ${suggestion.comment}`,
          });
        });
      } catch (e) {
        // JSON 파싱 실패시 전체 파일에 대한 코멘트
        reviews.push({
          path: file,
          line: 1,
          comment: response,
        });
      }
    } catch (error) {
      console.error(`Error reviewing ${file}:`, error);
    }
  }
  
  // 결과 저장
  await fs.writeFile('review-results.json', JSON.stringify(reviews, null, 2));
  console.log(`Generated ${reviews.length} review comments`);
}

reviewCode().catch(console.error);