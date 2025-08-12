#!/bin/bash

# Gemini 리뷰를 바탕으로 코드 개선하는 스크립트

set -e

echo "🔍 Applying Gemini Review Suggestions..."

# review-results.json 파일 확인
if [ ! -f "review-results.json" ]; then
    echo "❌ No review results found"
    exit 1
fi

# 리뷰 내용을 Claude에게 전달하여 코드 개선
REVIEW_CONTENT=$(cat review-results.json)
TASK="Based on this code review feedback, improve the code: $REVIEW_CONTENT"

echo "📝 Review suggestions found:"
cat review-results.json | jq '.'

echo ""
echo "🤖 Applying improvements with Claude..."

# Claude로 코드 개선 실행
claude --dangerously-skip-permissions "Apply these code review suggestions to improve the code: $(cat review-results.json | jq -r '.[] | "Line \(.line): \(.comment)"' | head -20)"

echo "✅ Code improvements applied!"

# 변경사항 커밋
if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m "refactor: Apply Gemini review suggestions
    
- Refactor repetitive code
- Add JSDoc comments
- Improve error messages
- Enhanced code quality based on automated review"
    
    echo "📦 Changes committed"
fi