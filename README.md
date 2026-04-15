# 브릿지옥션 (Bridge Auction) 기업 홈페이지

> 정보보안 · IT SI/NI · 통신사 부가서비스 전문 기업 공식 홈페이지

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 프로젝트 소개

브릿지옥션(Bridge Auction)은 **정보보안 컨설팅, IT SI/NI 구축, 통신사 부가서비스**를 전문으로 하는 기업입니다.
본 리포지토리는 기업 공식 홈페이지의 소스 코드입니다.

**주요 섹션**

| 섹션 | 내용 |
|------|------|
| Hero | 풀스크린 네트워크 SVG 배경, CTA 버튼 |
| 회사소개 | 애니메이션 카운터, 연혁 타임라인 |
| 핵심 가치 | 4대 가치 카드 (정보보안 / 기술력 / 신뢰 / 혁신) |
| 서비스 | 정보보안 / IT SI·NI / 통신사 부가서비스 탭 패널 |
| 업무 프로세스 | 6단계 순차 스크롤 타임라인 |
| 파트너사 | CSS 마퀴 무한 슬라이더 |
| 문의하기 | Formspree 연동 가능한 문의 폼 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | [Next.js 16.2.3](https://nextjs.org) (App Router) |
| UI 라이브러리 | [React 19](https://react.dev) |
| 언어 | [TypeScript 5](https://www.typescriptlang.org) (strict) |
| 스타일링 | [Tailwind CSS v4](https://tailwindcss.com) (`@theme` 토큰) |
| 애니메이션 | [Framer Motion 12](https://www.framer.com/motion/) |
| 아이콘 | [Lucide React](https://lucide.dev) |
| 폰트 | Pretendard (CDN) · Noto Sans KR (next/font) |
| 배포 | [Vercel](https://vercel.com) |

---

## 로컬 실행 방법

### 사전 요구사항

- Node.js **v18 이상**
- npm / yarn / pnpm / bun

### 설치 및 실행

```bash
# 1. 리포지토리 클론
git clone https://github.com/mkgkamz-art/bridgeauction-website.git
cd bridgeauction-website

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하세요.

### 주요 스크립트

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

### 환경 변수 (선택)

문의 폼을 Formspree와 연동하려면 프로젝트 루트에 `.env.local` 파일을 생성하세요.

```env
# Formspree 폼 ID (https://formspree.io 에서 발급)
NEXT_PUBLIC_FORM_ACTION_URL=https://formspree.io/f/YOUR_FORM_ID
```

설정하지 않으면 폼 제출 시 mailto 링크로 fallback 됩니다.

---

## 프로젝트 구조

```
src/
├── app/
│   ├── globals.css        # Tailwind @theme 토큰, 전역 스타일
│   ├── layout.tsx         # Root Layout (SEO 메타데이터)
│   └── page.tsx           # 메인 페이지 (섹션 조립)
├── components/
│   ├── Navbar.tsx         # 고정 네비게이션 바
│   ├── Hero.tsx           # 히어로 섹션
│   ├── About.tsx          # 회사소개 섹션
│   ├── CoreValues.tsx     # 핵심 가치 섹션
│   ├── Services.tsx       # 서비스 탭 섹션
│   ├── Process.tsx        # 업무 프로세스 섹션
│   ├── Partners.tsx       # 파트너사 마퀴 섹션
│   ├── Contact.tsx        # 문의하기 섹션
│   └── Footer.tsx         # 푸터
├── hooks/
│   ├── useScrollSpy.ts    # 활성 섹션 감지 훅
│   └── useIntersectionObserver.ts  # 뷰포트 진입 애니메이션 훅
└── types/
    └── index.ts           # 공통 TypeScript 타입 정의
```

---

## 배포 정보

### Vercel (권장)

1. [vercel.com](https://vercel.com) 로그인
2. **Add New Project** → GitHub 리포지토리 선택
3. Framework Preset: **Next.js** 자동 감지
4. (선택) Environment Variables에 `NEXT_PUBLIC_FORM_ACTION_URL` 추가
5. **Deploy** 클릭

배포 후 커밋 push 시 자동으로 재배포됩니다.

### 수동 빌드

```bash
npm run build   # .next/ 폴더에 빌드 결과물 생성
npm run start   # 프로덕션 모드 실행
```

---

## 라이선스

Copyright © 2025 브릿지옥션(Bridgeauction). All rights reserved.
