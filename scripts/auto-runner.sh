#!/bin/bash

# 24시간 자동 실행 스크립트
# cron이나 launchd로 주기적으로 실행

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$SCRIPT_DIR/../logs"
LOG_FILE="$LOG_DIR/runner-$(date +%Y%m%d).log"

# 로그 디렉토리 생성
mkdir -p "$LOG_DIR"

# 실행 로그 기록
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting auto runner..." >> "$LOG_FILE"

# Claude runner 실행
"$SCRIPT_DIR/claude-runner.sh" >> "$LOG_FILE" 2>&1

# 실행 완료 로그
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Auto runner completed" >> "$LOG_FILE"