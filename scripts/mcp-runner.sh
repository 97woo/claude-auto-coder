#!/bin/bash

# MCP를 통한 Claude 실행 스크립트

set -e

echo "🤖 Claude MCP Runner"
echo "===================="

# MCP 서버 설치
echo "📦 Installing MCP server dependencies..."
cd mcp-server
npm install
cd ..

# Claude Desktop 설정 파일 복사
CONFIG_DIR="$HOME/Library/Application Support/Claude"
if [ -d "$CONFIG_DIR" ]; then
    echo "📝 Updating Claude Desktop config..."
    cp claude_desktop_config.json "$CONFIG_DIR/config.json"
    echo "✅ Config updated. Please restart Claude Desktop."
else
    echo "⚠️  Claude Desktop config directory not found"
    echo "Please copy claude_desktop_config.json to:"
    echo "  ~/Library/Application Support/Claude/config.json"
fi

# 작업 처리
TASK_DIR="tasks"
if [ ! -d "$TASK_DIR" ]; then
    echo "No tasks directory found."
    exit 0
fi

# pending 작업 찾기
for task_file in $TASK_DIR/*.json; do
    [ -e "$task_file" ] || continue
    
    # JSON 파싱 (jq가 있으면 사용, 없으면 sed 사용)
    if command -v jq &> /dev/null; then
        STATUS=$(jq -r '.status' "$task_file")
        TASK=$(jq -r '.task' "$task_file")
        ID=$(jq -r '.id' "$task_file")
    else
        STATUS=$(sed -n 's/.*"status": *"\([^"]*\)".*/\1/p' "$task_file")
        TASK=$(sed -n 's/.*"task": *"\([^"]*\)".*/\1/p' "$task_file")
        ID=$(sed -n 's/.*"id": *"\([^"]*\)".*/\1/p' "$task_file")
    fi
    
    if [ "$STATUS" = "pending" ]; then
        
        echo "📋 Found task #$ID: $TASK"
        echo ""
        echo "To process this task with MCP:"
        echo "1. Open Claude Desktop"
        echo "2. Start a new conversation"
        echo "3. Use the MCP tools to complete: $TASK"
        echo ""
        echo "Available MCP commands:"
        echo "  - create_file: Create new files"
        echo "  - edit_file: Edit existing files"
        echo "  - run_command: Run shell commands"
        echo "  - git_commit: Create commits"
        echo "  - create_pr: Create pull requests"
        
        break
    fi
done