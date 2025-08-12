#!/bin/bash

# Claude 자동 승인 래퍼 스크립트
# 엔터키를 자동으로 입력

TASK="$1"

# 무한 루프로 엔터 입력
(
    while true; do
        echo ""
        sleep 0.5
    done
) | claude "$TASK"