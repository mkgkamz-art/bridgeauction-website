"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ChevronRight, Pause, Play } from "lucide-react";

/* =========================================================
   파트너사 플레이스홀더 데이터 (추후 실제 로고로 교체)
   ========================================================= */
interface Partner {
  id: number;
  name: string;
  category: string;
  width: string; // 박스 너비 — 로고별 시각 다양성 연출
}

const PARTNERS: Partner[] = [
  { id: 1,  name: "삼성SDS",   category: "IT서비스",  width: "w-36" },
  { id: 2,  name: "LG CNS",    category: "IT서비스",  width: "w-28" },
  { id: 3,  name: "SK텔레콤",  category: "통신",      width: "w-32" },
  { id: 4,  name: "KT",        category: "통신",      width: "w-20" },
  { id: 5,  name: "현대자동차", category: "제조",     width: "w-36" },
  { id: 6,  name: "한국전력",  category: "에너지",    width: "w-32" },
  { id: 7,  name: "NH농협은행", category: "금융",     width: "w-36" },
  { id: 8,  name: "신한은행",  category: "금융",      width: "w-32" },
  { id: 9,  name: "롯데그룹",  category: "유통",      width: "w-28" },
  { id: 10, name: "GS칼텍스",  category: "에너지",   width: "w-32" },
  { id: 11, name: "포스코ICT", category: "IT서비스",  width: "w-32" },
  { id: 12, name: "CJ대한통운", category: "물류",    width: "w-36" },
];

/* 실적 뱃지 */
const STATS = [
  { value: "200+", label: "파트너사" },
  { value: "15+",  label: "업종" },
  { value: "10+",  label: "년 신뢰" },
];

/* =========================================================
   Partners Component
   ========================================================= */
export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);
  // 마퀴 무한 루프: 원본 + 복제본 → -50% translate로 seamless
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
            >
              PARTNERS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight"
            >
              주요 고객사
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="mt-4 h-1 w-14 rounded-full bg-brand-secondary"
            />
          </div>

          {/* 실적 뱃지 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-6 sm:gap-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-brand-primary text-2xl font-bold leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-xs">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 마퀴 슬라이더 (full-bleed) ─────────────────── */}
      <div className="relative">
        {/* 왼쪽 페이드 마스크 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* 오른쪽 페이드 마스크 */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* 슬라이더 트랙 */}
        <div
          className="overflow-hidden"
          role="region"
          aria-label="파트너사 로고 슬라이더"
        >
          <div
            className={`flex gap-5 animate-marquee py-3 ${isPaused ? "[animation-play-state:paused]" : ""}`}
            aria-live="off"
          >
            {doubled.map((partner, i) => (
              <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* 일시정지 버튼 — WCAG 2.2.2 */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "슬라이더 재생" : "슬라이더 일시정지"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {isPaused
              ? <><Play size={12} /> 재생</>
              : <><Pause size={12} /> 일시정지</>
            }
          </button>
        </div>
      </div>

      {/* ── 보조 정보 ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 rounded-2xl bg-brand-light border border-brand-accent/15"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 size={20} className="text-brand-secondary" />
            </div>
            <div>
              <p className="text-text-primary font-bold text-sm mb-1">
                다양한 업종의 기업들이 브릿지옥션을 신뢰합니다
              </p>
              <p className="text-text-secondary text-xs leading-relaxed">
                금융, 제조, 통신, 유통, 에너지 등 전 산업군에 걸쳐 IT 보안 및 인프라 솔루션을 제공하고 있습니다.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-brand-secondary text-sm font-semibold hover:text-brand-accent transition-colors duration-200 group whitespace-nowrap shrink-0"
          >
            파트너십 문의
            <ChevronRight
              size={16}
              className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   파트너 카드 (개별 로고 플레이스홀더)
   ========================================================= */
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className={`${partner.width} h-20 shrink-0 flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-secondary/40 hover:bg-brand-light hover:shadow-sm transition-all duration-300 cursor-default px-4 gap-1`}
      title={`${partner.name} — ${partner.category}`}
    >
      {/* 로고 플레이스홀더 영역 */}
      <div className="w-full h-7 rounded bg-slate-200/80 flex items-center justify-center">
        <span className="text-slate-400 text-[9px] font-semibold tracking-wider uppercase">
          LOGO
        </span>
      </div>
      {/* 회사명 */}
      <span className="text-slate-500 text-[10px] font-medium text-center leading-tight truncate w-full text-center">
        {partner.name}
      </span>
    </div>
  );
}
