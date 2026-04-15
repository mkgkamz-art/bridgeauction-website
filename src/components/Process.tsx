"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  ScanSearch,
  FileText,
  Settings2,
  ClipboardCheck,
  Headphones,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================================================
   데이터 상수
   ========================================================= */
interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: PhoneCall,
    title: "상담 접수",
    subtitle: "Consultation",
    desc: "고객사 요구사항 및 현황을 파악하는 초기 상담을 진행합니다.",
  },
  {
    number: 2,
    icon: ScanSearch,
    title: "현황 분석",
    subtitle: "Analysis",
    desc: "현재 IT 환경과 보안 취약점을 심층 분석·진단합니다.",
  },
  {
    number: 3,
    icon: FileText,
    title: "솔루션 설계",
    subtitle: "Design",
    desc: "분석 결과 기반으로 최적의 맞춤 솔루션을 설계합니다.",
  },
  {
    number: 4,
    icon: Settings2,
    title: "구축/구현",
    subtitle: "Implementation",
    desc: "설계된 솔루션을 안전하고 신속하게 구축·구현합니다.",
  },
  {
    number: 5,
    icon: ClipboardCheck,
    title: "테스트/검증",
    subtitle: "Testing",
    desc: "구축 시스템의 안정성과 성능을 철저히 검증합니다.",
  },
  {
    number: 6,
    icon: Headphones,
    title: "운영/지원",
    subtitle: "Support",
    desc: "24/7 모니터링과 전담 기술 지원으로 안정적 운영을 보장합니다.",
  },
];

const STEP_DELAY_MS = 340; // 단계별 활성화 간격

/* =========================================================
   Process Component
   ========================================================= */
export default function Process() {
  const [activeCount, setActiveCount] = useState(0); // 0 = 아무것도 활성화 안됨
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  /* 섹션이 뷰포트에 들어오면 단계를 순차 활성화 */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          STEPS.forEach((_, i) => {
            setTimeout(() => {
              setActiveCount(i + 1);
            }, i * STEP_DELAY_MS);
          });
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
          >
            PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            업무 프로세스
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            첫 상담부터 운영 지원까지, 체계적인 6단계 프로세스로 프로젝트를 완수합니다
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
            style={{ originX: 0.5 }}
            className="mt-4 h-1 w-14 rounded-full bg-brand-secondary mx-auto"
          />
        </div>

        {/* ══════════════════════════════════════════════════
            데스크톱 수평 타임라인 (md 이상)
            ══════════════════════════════════════════════════ */}
        <div className="hidden md:block">
          {/* 원형 배지 + 연결선 행 */}
          <div className="flex items-center mb-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeCount > i;
              const isLineActive = activeCount > i + 1; // 다음 단계가 활성화돼야 선 채움

              return (
                <div key={step.number} className="flex items-center flex-1">
                  {/* ── 원형 뱃지 ── */}
                  <div className="relative flex flex-col items-center flex-shrink-0">
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#1E5BC6" : "#E2E8F0",
                        borderColor: isActive ? "#3B82F6" : "#CBD5E1",
                        boxShadow: isActive
                          ? "0 0 0 6px rgba(59,130,246,0.12)"
                          : "0 0 0 0px rgba(59,130,246,0)",
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center relative z-10"
                    >
                      {/* 활성화 완료 — 원 안 체크 */}
                      {isActive && activeCount === STEPS.length && i < STEPS.length - 1 && (
                        <motion.svg
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.1 }}
                          className="absolute inset-0 m-auto"
                          width="22" height="22" viewBox="0 0 22 22" fill="none"
                        >
                          <path d="M5 11l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}

                      {/* 번호 */}
                      <motion.span
                        animate={{ opacity: isActive && activeCount === STEPS.length && i < STEPS.length - 1 ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm font-bold leading-none ${isActive ? "text-white" : "text-slate-400"}`}
                      >
                        {String(step.number).padStart(2, "0")}
                      </motion.span>

                      {/* 아이콘 */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                        className="mt-0.5"
                      >
                        <Icon size={13} className={isActive ? "text-blue-200" : "text-slate-400"} />
                      </motion.div>
                    </motion.div>

                    {/* 활성 단계 펄스 링 */}
                    {isActive && activeCount === i + 1 && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-brand-accent/30 z-0"
                      />
                    )}
                  </div>

                  {/* ── 연결선 (마지막 단계 제외) ── */}
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 bg-slate-200 mx-1 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-brand-secondary rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isLineActive ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                      {/* 흐르는 점 (라인 활성화 중) */}
                      {activeCount === i + 1 && (
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent"
                          initial={{ left: "0%" }}
                          animate={{ left: "100%" }}
                          transition={{ duration: STEP_DELAY_MS / 1000 - 0.05, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 설명 텍스트 행 (원형 배지 아래) */}
          <div className="grid grid-cols-6 gap-2">
            {STEPS.map((step, i) => {
              const isActive = activeCount > i;
              return (
                <motion.div
                  key={step.number}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center px-1"
                >
                  <p
                    className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-1.5 transition-colors duration-300 ${
                      isActive ? "text-brand-accent" : "text-slate-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                  <p
                    className={`text-sm font-bold mb-1.5 transition-colors duration-300 ${
                      isActive ? "text-text-primary" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-text-secondary text-xs leading-snug">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            모바일 수직 타임라인 (md 미만)
            ══════════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeCount > i;
            const isLast = i === STEPS.length - 1;

            return (
              <div key={step.number} className="flex gap-5">
                {/* 왼쪽: 원 + 수직선 */}
                <div className="flex flex-col items-center shrink-0">
                  {/* 원형 뱃지 */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "#1E5BC6" : "#E2E8F0",
                      borderColor: isActive ? "#3B82F6" : "#CBD5E1",
                      boxShadow: isActive
                        ? "0 0 0 5px rgba(59,130,246,0.12)"
                        : "0 0 0 0px rgba(59,130,246,0)",
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center relative z-10 shrink-0"
                  >
                    <span
                      className={`text-xs font-bold leading-none ${isActive ? "text-white" : "text-slate-400"}`}
                    >
                      {String(step.number).padStart(2, "0")}
                    </span>
                    <Icon size={11} className={`mt-0.5 ${isActive ? "text-blue-200" : "text-slate-400"}`} />
                  </motion.div>

                  {/* 수직 연결선 */}
                  {!isLast && (
                    <div className="flex-1 w-0.5 bg-slate-200 my-1.5 relative overflow-hidden min-h-[3rem]">
                      <motion.div
                        className="absolute inset-x-0 top-0 bg-brand-secondary rounded-full"
                        initial={{ height: "0%" }}
                        animate={{ height: isActive ? "100%" : "0%" }}
                        style={{ originY: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </div>

                {/* 오른쪽: 텍스트 */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className={`pb-8 ${isLast ? "pb-0" : ""}`}
                >
                  <p
                    className={`text-[10px] font-bold tracking-[0.12em] uppercase mb-1 transition-colors duration-300 ${
                      isActive ? "text-brand-accent" : "text-slate-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                  <h3
                    className={`text-sm font-bold mb-1.5 transition-colors duration-300 ${
                      isActive ? "text-text-primary" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── 하단 CTA ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-text-secondary text-sm mb-5">
            지금 바로 1단계 무료 상담을 시작하세요
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-brand-primary/20"
          >
            무료 상담 신청하기
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
