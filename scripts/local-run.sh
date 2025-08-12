#!/bin/bash

# 로컬에서 Claude Code 실행 스크립트

set -e

echo "🤖 Starting Claude Code locally..."

# Claude Code 설치 확인
if ! command -v claude-code &> /dev/null; then
    echo "Installing Claude Code CLI..."
    npm install -g @anthropic-ai/claude-code
fi

# 환경 변수 확인
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "❌ Error: ANTHROPIC_API_KEY is not set"
    echo "Please set it in your environment or .env file"
    exit 1
fi

# 작업 설정
TASK=${1:-"Review the codebase and suggest improvements"}

echo "📝 Task: $TASK"

# CLAUDE.md 생성
cat > CLAUDE.md << EOF
# Task for Claude Code

$TASK

## Guidelines
- Follow the development guidelines
- Write clean, maintainable code
- Add tests for new features
- Update documentation
EOF

# Claude Code 실행
claude-code --max-file-size 100000 \
           --continue-on-error \
           "$TASK"

echo "✅ Claude Code completed!"