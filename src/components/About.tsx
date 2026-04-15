"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { CheckCircle2, Building2, Award } from "lucide-react";

/* =========================================================
   데이터 상수
   ========================================================= */
const STATS = [
  { value: 500, suffix: "+", label: "프로젝트 수행", desc: "누적 완료 건수" },
  { value: 200, suffix: "+", label: "고객사",        desc: "국내외 파트너"  },
  { value: 50,  suffix: "+", label: "전문 인력",     desc: "보안·IT 전문가" },
  { value: 15,  suffix: "+", label: "보안 인증",     desc: "공인 인증 보유" },
];

const HISTORY = [
  { year: "2024", text: "정보보안 컨설팅 사업부 신설 및 ISMS 인증 취득" },
  { year: "2022", text: "통신사 부가서비스 사업 공식 파트너십 체결" },
  { year: "2020", text: "IT SI/NI 사업 본격 확대 — 전문 인력 50명 달성" },
  { year: "2015", text: "브릿지옥션 법인 설립" },
];

const STRENGTHS = [
  "KISA 인증 정보보안 컨설팅 역량",
  "통신사 공식 부가서비스 파트너",
  "SI/NI 원스톱 설계·구축·운영",
  "24/7 즉각 기술 지원 체계",
];

/* =========================================================
   섹션 헤더 공통 컴포넌트
   ========================================================= */
function SectionHeader({
  en,
  ko,
  align = "left",
}: {
  en: string;
  ko: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
      >
        {en}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight"
      >
        {ko}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
        className="mt-4 h-1 w-14 rounded-full bg-brand-secondary"
      />
    </div>
  );
}

/* =========================================================
   카운터 애니메이션 컴포넌트
   ========================================================= */
function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const controls = animate(0, value, {
            duration: 2.0,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (v) => setCount(Math.round(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* =========================================================
   About Component
   ========================================================= */
export default function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <SectionHeader en="ABOUT US" ko="회사소개" />

        {/* ── 2컬럼 레이아웃 ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── 왼쪽: 회사 설명 + 연혁 ──────────────────── */}
          <div>
            {/* 핵심 소개 텍스트 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8"
            >
              브릿지옥션은{" "}
              <strong className="text-text-primary font-semibold">
                정보보안, IT 인프라, 통신 부가서비스
              </strong>{" "}
              분야에서 고객의 비즈니스와 기술을 연결하는 전문 기업입니다.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              고객사의 디지털 자산을 보호하고, 안정적인 IT 환경을 구축하며,
              통신 서비스 혁신을 이끄는 올인원 파트너로서 기업 성장을 함께 설계합니다.
            </motion.p>

            {/* 강점 체크리스트 */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
              className="space-y-3 mb-12"
            >
              {STRENGTHS.map((str) => (
                <motion.li
                  key={str}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <CheckCircle2
                    size={18}
                    className="text-brand-accent shrink-0"
                  />
                  {str}
                </motion.li>
              ))}
            </motion.ul>

            {/* 연혁 타임라인 */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building2 size={18} className="text-brand-secondary" />
                <h3 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  연혁
                </h3>
              </div>

              <div className="relative pl-5 border-l-2 border-slate-100 space-y-6">
                {HISTORY.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="relative"
                  >
                    {/* 타임라인 도트 */}
                    <span className="absolute -left-[1.45rem] top-1 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white shadow-sm" />
                    <p className="text-brand-secondary text-xs font-bold tracking-wider mb-0.5">
                      {item.year}
                    </p>
                    <p className="text-text-secondary text-sm leading-snug">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 오른쪽: 숫자 카운터 카드 ─────────────────── */}
          <div>
            {/* 인증 뱃지 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2.5 mb-8 px-4 py-3 rounded-xl bg-brand-light border border-brand-accent/20 w-fit"
            >
              <Award size={18} className="text-brand-accent shrink-0" />
              <span className="text-brand-primary text-sm font-semibold">
                KISA · ISMS · ISO 27001 인증 보유
              </span>
            </motion.div>

            {/* 2×2 카운터 그리드 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
              }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                    },
                  }}
                  className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-brand-primary text-center overflow-hidden group"
                >
                  {/* 배경 글로우 */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* 카운터 숫자 */}
                  <p className="text-white text-3xl sm:text-4xl font-bold leading-none mb-2 tabular-nums">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>

                  {/* 라벨 */}
                  <p className="text-blue-200 text-sm font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-blue-300/60 text-[11px]">
                    {stat.desc}
                  </p>

                  {/* 하단 액센트 라인 */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent/50" />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA 링크 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-brand-secondary text-sm font-semibold hover:text-brand-accent transition-colors duration-200 group"
              >
                파트너십 문의하기
                <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
