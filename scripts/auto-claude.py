#!/usr/bin/env python3
"""
Claude 자동 실행 스크립트
pexpect를 사용해 권한 요청시 자동으로 엔터 입력
"""

import sys
import time
try:
    import pexpect
except ImportError:
    print("Installing pexpect...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pexpect"])
    import pexpect

def run_claude_auto(task):
    """Claude 실행하고 자동으로 권한 승인"""
    
    # Claude 프로세스 시작
    child = pexpect.spawn('claude', [task], timeout=120, encoding='utf-8')
    
    try:
        while True:
            # 권한 요청 패턴 감지
            index = child.expect([
                'permission',  # 권한 요청
                'Press Enter', # 엔터 요청
                'Would you like', # 확인 요청
                'proceed',     # 진행 확인
                'Create',      # 생성 확인
                'Write',       # 쓰기 확인
                pexpect.EOF,   # 프로세스 종료
                pexpect.TIMEOUT
            ], timeout=10)
            
            if index < 6:  # 권한 요청 패턴 감지됨
                print(f"✅ Auto-approving... (pattern {index})")
                child.sendline('')  # 엔터 입력
            elif index == 6:  # EOF
                print("Claude completed")
                break
            else:  # Timeout
                # 출력 확인
                try:
                    child.expect('\n', timeout=1)
                except:
                    pass
                    
    except Exception as e:
        print(f"Error: {e}")
    
    # 남은 출력 가져오기
    child.close()
    print(child.before)
    
    return child.exitstatus

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 auto-claude.py '<task>'")
        sys.exit(1)
    
    task = " ".join(sys.argv[1:])
    print(f"🚀 Running Claude with task: {task}")
    
    exit_code = run_claude_auto(task)
    sys.exit(exit_code or 0)