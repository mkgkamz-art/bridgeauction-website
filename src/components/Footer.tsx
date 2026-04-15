"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ChevronUp, ExternalLink } from "lucide-react";

/* =========================================================
   데이터 상수
   ========================================================= */
const NAV_LINKS = [
  { label: "회사소개", href: "#about"    },
  { label: "서비스",   href: "#services" },
  { label: "프로세스", href: "#process"  },
  { label: "문의하기", href: "#contact"  },
];

const SOCIAL_LINKS = [
  { label: "이메일",  href: "mailto:contact@reanote.co.kr",    icon: Mail  },
  { label: "대표전화", href: "tel:15335865",                   icon: Phone },
];

const CURRENT_YEAR = new Date().getFullYear();

/* =========================================================
   Footer Component
   ========================================================= */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  /* 스크롤 400px 이상 시 맨위로 버튼 노출 */
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── 푸터 본체 ─────────────────────────────────── */}
      <footer className="bg-brand-dark text-white">
        {/* 상단 구분선 — 브랜드 그라디언트 */}
        <div className="h-px w-full bg-linear-to-r from-brand-primary via-brand-accent to-brand-primary" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── 3컬럼 메인 영역 ──────────────────────────── */}
          <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

            {/* 컬럼 1: 회사 정보 */}
            <div className="lg:col-span-1">
              {/* 로고 */}
              <a href="#" className="inline-flex items-center gap-2 group mb-5">
                <span className="text-white font-bold text-base tracking-[0.18em] group-hover:text-blue-300 transition-colors duration-200">
                  BRIDGE
                </span>
                <span className="w-px h-4 bg-white/25" aria-hidden="true" />
                <span className="text-blue-400 font-bold text-base tracking-[0.18em] group-hover:text-blue-300 transition-colors duration-200">
                  AUCTION
                </span>
              </a>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                정보보안, IT 인프라, 통신 부가서비스 분야에서 기업의 비즈니스와 기술을 연결하는 전문 파트너입니다.
              </p>

              {/* 사업자 정보 */}
              <div className="space-y-1.5">
                {[
                  { label: "주소",          value: "서울시 금천구 가산디지털2로 70, 1803호" },
                  { label: "사업자등록번호", value: "539-86-01777" },
                  { label: "통신판매업신고", value: "제2023-서울금천-0580호" },
                ].map((info) => (
                  <p key={info.label} className="text-slate-500 text-xs flex gap-2">
                    <span className="text-slate-600 shrink-0">{info.label}</span>
                    <span>{info.value}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* 컬럼 2: 빠른 링크 */}
            <div>
              <h3 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-brand-accent" />
                빠른 링크
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      <span className="w-0 h-px bg-brand-accent transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* 외부 링크 (선택) */}
              <div className="mt-8">
                <h3 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-brand-accent" />
                  관련 사이트
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "KISA 한국인터넷진흥원", href: "https://www.kisa.or.kr" },
                    { label: "과학기술정보통신부",     href: "https://www.msit.go.kr" },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200"
                      >
                        {link.label}
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 컬럼 3: SNS / 연락처 */}
            <div>
              <h3 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-brand-accent" />
                연락처
              </h3>

              {/* 연락 수단 */}
              <div className="space-y-3 mb-8">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex items-center gap-3 text-slate-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-secondary/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                        <Icon size={15} className="text-slate-500 group-hover:text-brand-accent transition-colors duration-200" />
                      </div>
                      <span>
                        {link.label === "이메일"
                          ? "contact@reanote.co.kr"
                          : "1533-5865"}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* 영업시간 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                <p className="text-slate-400 text-[11px] font-semibold tracking-wide uppercase mb-2">
                  영업시간
                </p>
                <p className="text-white text-sm font-medium">
                  월 – 금  10:00 ~ 18:00
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  토·일·공휴일 휴무
                </p>
              </div>

              {/* CTA 버튼 */}
              <a
                href="#contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-secondary hover:bg-brand-accent text-white text-sm font-semibold transition-colors duration-200"
              >
                무료 상담 신청
                <span>→</span>
              </a>
            </div>
          </div>

          {/* ── 하단 구분선 + 저작권 ────────────────────── */}
          <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © {CURRENT_YEAR} Bridgeauction. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["개인정보처리방침", "이용약관"].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── 맨 위로 가기 버튼 (fixed, 우하단) ────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-secondary border border-brand-secondary/40 text-white shadow-lg shadow-brand-dark/40 flex items-center justify-center transition-colors duration-200 group"
          >
            <ChevronUp
              size={20}
              className="translate-y-0 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
