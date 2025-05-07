# 알고리즘 스터디 공지사항 봇

이 프로젝트는 Discord.js와 JavaScript를 사용하여 알고리즘 스터디 공지사항을 자동으로 전송하는 Discord 봇입니다. 이 봇은 Git 및 GitHub으로 버전 관리되며 Angular Commit Convention을 사용하여 커밋 메시지를 작성합니다.

## 기능

- 다음주에 풀이할 알고리즘 문제 메시지 전송

## 기술 스택

- Bun
- Discord.js
- JavaScript
- Git & GitHub

## 시작하기

### 필수 조건

- Node.js (최소 14.x 버전)
- Discord 계정 및 서버
- Discord 봇 토큰

## 사용법

Discord 서버에서 봇을 추가하고 명령어를 통해 다양한 기능을 사용할 수 있습니다. 기본 명령어는 다음과 같습니다:

- `/문제공지`: 알고리즘 스터디 서버에서 다음주 풀이할 문제 3개와 발표자에 대한 공지 메시지를 전송합니다.

## 커밋 메시지 컨벤션

이 프로젝트는 [Angular Commit Convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit)를 사용합니다. 메시지 형식은 다음과 같습니다:

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서만 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 누락된 테스트 추가 또는 기존 테스트 수정
- `chore`: 빌드 프로세스 또는 보조 도구 및 라이브러리 변경
