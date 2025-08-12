#!/bin/bash

# Cron 작업 설정 스크립트

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
RUNNER_SCRIPT="$SCRIPT_DIR/auto-runner.sh"

echo "⚙️  Setting up cron job for 24/7 automation..."

# 현재 crontab 백업
crontab -l > /tmp/current_cron 2>/dev/null || true

# 이미 등록된 작업이 있는지 확인
if grep -q "auto-runner.sh" /tmp/current_cron; then
    echo "❌ Cron job already exists. Removing old entry..."
    grep -v "auto-runner.sh" /tmp/current_cron > /tmp/new_cron
    cp /tmp/new_cron /tmp/current_cron
fi

# 새 cron 작업 추가 (30분마다 실행)
echo "*/30 * * * * $RUNNER_SCRIPT" >> /tmp/current_cron

# crontab 업데이트
crontab /tmp/current_cron

echo "✅ Cron job installed successfully!"
echo "📅 The runner will check for new tasks every 30 minutes"
echo ""
echo "To view current cron jobs: crontab -l"
echo "To remove the cron job: crontab -e (and delete the line)"
echo ""
echo "Alternatively, use launchd on macOS for better integration:"
echo "  cp com.ai-code-generator.plist ~/Library/LaunchAgents/"
echo "  launchctl load ~/Library/LaunchAgents/com.ai-code-generator.plist"