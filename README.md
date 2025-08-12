# Claude Auto Coder - 24/7 AI 코드 생성 자동화

Claude Code Pro와 Gemini를 활용한 24시간 무인 코드 생성 시스템

## 🚀 핵심 기능

- **Claude Code Pro 활용**: API 키 없이 이미 구독 중인 Claude Code 세션 사용 (월 $30)
- **완전 자동화**: 파일 생성 권한 자동 승인으로 무인 실행 가능
- **GitHub Actions 트리거**: "뭐 만들어놔" 하면 자동으로 작업 생성
- **로컬 실행**: 본인 컴퓨터에서 Claude Code가 자동으로 작업 수행
- **Gemini 자동 리뷰**: PR 생성 시 자동으로 코드 리뷰
- **24/7 자동화**: 30분마다 새 작업 확인 및 처리

## 📋 사용법

### 1. 초기 설정

```bash
# 1. 저장소 클론
git clone https://github.com/97woo/claude-auto-coder.git
cd claude-auto-coder

# 2. 의존성 설치
npm install

# 3. 실행 권한 부여
chmod +x scripts/*.sh

# 4. 자동 실행 설정 (Mac)
cp com.ai-code-generator.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ai-code-generator.plist
```

### 2. 작업 요청하기

GitHub Actions에서:
1. Actions 탭 → "Local Code Task Runner" 선택
2. "Run workflow" 클릭
3. 작업 내용 입력 (예: "TODO 앱 만들어줘", "로그인 기능 추가해줘")
4. Submit

### 3. 자동 처리 과정

1. **작업 생성**: GitHub Actions가 `tasks/` 폴더에 작업 파일 생성
2. **로컬 실행**: 30분마다 스크립트가 새 작업 확인
3. **Claude Code 실행**: 로컬에서 Claude Code가 작업 수행
4. **PR 생성**: 완료된 코드를 자동으로 PR 생성
5. **Gemini 리뷰**: PR에 대해 자동으로 코드 리뷰

## 🛠 Architecture

```
├── .github/
│   └── workflows/      
│       ├── ai-generator.yml    # 작업 생성 워크플로우
│       └── gemini-review.yml   # PR 리뷰 워크플로우
├── scripts/
│   ├── claude-runner.sh        # Claude Code 실행 스크립트
│   ├── auto-runner.sh          # 자동 실행 스크립트
│   └── setup-cron.sh          # Cron 설정
├── src/
│   └── review.js              # Gemini 리뷰 모듈
├── tasks/                     # 작업 큐
└── logs/                      # 실행 로그
```

## ⚙️ 환경 변수

`.env` 파일 생성:
```bash
# Gemini 리뷰용 (필수)
GEMINI_API_KEY=your_gemini_api_key

# GitHub 설정
GITHUB_OWNER=your_username
GITHUB_REPO=claude-auto-coder

# 로컬 머신 이름
MACHINE_NAME=local-mac
```

## 📝 작업 예시

```bash
# 기능 추가
"사용자 인증 시스템 추가해줘"

# 버그 수정
"메모리 누수 문제 찾아서 수정해줘"

# 리팩토링
"코드 품질 개선하고 테스트 추가해줘"

# 문서화
"API 문서 자동 생성 시스템 만들어줘"
```

## 🔧 문제 해결

### Claude Code 로그인 확인
```bash
claude --version  # Claude Code 설치 확인
claude login     # 로그인 (Pro 구독 필요)
```

### 로그 확인
```bash
tail -f logs/runner-*.log
```

### 수동 실행
```bash
./scripts/claude-runner.sh
```