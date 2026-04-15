import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

/* =========================================================
   Noto Sans KR — next/font으로 최적화 로드
   Pretendard는 Google Fonts 미등록 → <link> CDN으로 별도 로드
   ========================================================= */
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

/* =========================================================
   메타데이터 — SEO + Open Graph
   ========================================================= */
export const metadata: Metadata = {
  title: "브릿지옥션 | 정보보안 · IT SI/NI · 통신사 부가서비스",
  description:
    "브릿지옥션은 정보보안 컨설팅, IT SI/NI 구축, 통신사 부가서비스 전문 기업입니다. 기술과 신뢰의 다리를 잇는 파트너로서 고객의 디지털 혁신을 함께 설계합니다.",
  keywords: [
    "브릿지옥션",
    "Bridge Auction",
    "정보보안",
    "IT SI",
    "NI",
    "통신사 부가서비스",
    "보안 컨설팅",
    "네트워크 인프라",
  ],
  authors: [{ name: "브릿지옥션", url: "https://bridgeauction.co.kr" }],
  creator: "브릿지옥션",
  publisher: "브릿지옥션",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bridgeauction.co.kr",
    siteName: "브릿지옥션",
    title: "브릿지옥션 | 정보보안 · IT SI/NI · 통신사 부가서비스",
    description:
      "기술과 신뢰의 다리를 잇다 — 브릿지옥션은 정보보안 컨설팅, IT SI/NI 구축, 통신사 부가서비스 전문 기업입니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "브릿지옥션 — 기술과 신뢰의 다리를 잇다",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "브릿지옥션 | 정보보안 · IT SI/NI · 통신사 부가서비스",
    description:
      "기술과 신뢰의 다리를 잇다 — 브릿지옥션은 정보보안 컨설팅, IT SI/NI 구축, 통신사 부가서비스 전문 기업입니다.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://bridgeauction.co.kr"),
};

/* =========================================================
   Root Layout
   ========================================================= */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        {/* Pretendard Variable — CDN (Google Fonts 미지원 폰트) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* 스킵 네비게이션 — 키보드 사용자가 반복 내비게이션을 건너뜁니다 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:px-5 focus:py-2.5 focus:rounded-xl focus:bg-brand-primary focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
