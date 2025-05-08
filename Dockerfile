# Bun 공식 이미지 사용
FROM oven/bun:latest as build

WORKDIR /app

# 프로젝트 전체 복사
COPY package.json bun.lock ./

# 의존성 설치
RUN bun install

# 소스 코드 디렉토리 복사
COPY src ./src

# 환경변수에서 Base64 값 디코딩하여 credentials.json 생성
ENV CREDENTIALS=$CREDENTIALS

RUN echo "$CREDENTIALS" | base64 -d > study-assistant-459107-account-credentials.json

# 설치 및 빌드
RUN bun install
RUN bun run build

# 앱 실행
CMD ["bun", "./dist/index.js"]