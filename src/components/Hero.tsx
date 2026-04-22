"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

/* =========================================================
   SVG 네트워크 배경 — 모듈 레벨 상수 (하이드레이션 불일치 방지)
   viewBox="0 0 100 100" 기준 좌표 (%)
   ========================================================= */
const NODES = [
  { id: 0,  cx: 8,   cy: 15,  r: 2.2, delay: 0.0  },
  { id: 1,  cx: 22,  cy: 72,  r: 1.6, delay: 0.4  },
  { id: 2,  cx: 38,  cy: 22,  r: 2.8, delay: 0.8  },
  { id: 3,  cx: 55,  cy: 58,  r: 2.0, delay: 1.2  },
  { id: 4,  cx: 70,  cy: 14,  r: 2.5, delay: 0.3  },
  { id: 5,  cx: 84,  cy: 78,  r: 1.8, delay: 0.9  },
  { id: 6,  cx: 93,  cy: 40,  r: 2.4, delay: 0.6  },
  { id: 7,  cx: 14,  cy: 88,  r: 1.6, delay: 1.5  },
  { id: 8,  cx: 48,  cy: 88,  r: 1.8, delay: 0.2  },
  { id: 9,  cx: 65,  cy: 36,  r: 2.2, delay: 1.0  },
  { id: 10, cx: 30,  cy: 50,  r: 1.6, delay: 0.7  },
  { id: 11, cx: 76,  cy: 60,  r: 2.6, delay: 1.3  },
  { id: 12, cx: 50,  cy: 10,  r: 1.4, delay: 0.5  },
  { id: 13, cx: 6,   cy: 50,  r: 1.8, delay: 1.1  },
  { id: 14, cx: 90,  cy: 12,  r: 1.4, delay: 0.85 },
];

const EDGES: [number, number][] = [
  [0, 2],  [0, 10], [0, 13],
  [1, 10], [1, 7],  [1, 8],
  [2, 9],  [2, 4],  [2, 12],
  [3, 9],  [3, 11], [3, 8],
  [4, 6],  [4, 9],  [4, 14],
  [5, 11], [5, 8],
  [6, 11], [6, 14],
  [7, 8],  [7, 13],
  [9, 6],  [10, 3], [12, 4],
];

/* =========================================================
   framer-motion Variants
   ========================================================= */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const tagVariants = {
  hidden:   { opacity: 0, y: 14, letterSpacing: "0.3em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0.18em",
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

/* =========================================================
   Hero Component
   ========================================================= */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
    >
      {/* ── SVG 배경 네트워크 ─────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* 그리드 패턴 (미묘한 배경) */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E5BC6" strokeWidth="0.08" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* 엣지 (연결선) */}
        {EDGES.map(([i, j]) => (
          <motion.line
            key={`edge-${i}-${j}`}
            x1={NODES[i].cx}
            y1={NODES[i].cy}
            x2={NODES[j].cx}
            y2={NODES[j].cy}
            stroke="#1E5BC6"
            strokeWidth="0.25"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0.12, 0.45, 0] }}
            transition={{
              duration: 4.5,
              delay: (NODES[i].delay + NODES[j].delay) * 0.6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
          />
        ))}

        {/* 노드 (점) */}
        {NODES.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#3B82F6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.25, 0.85, 0.25],
              scale:   [1,    1.5,  1   ],
            }}
            transition={{
              duration: 3.2,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.2,
            }}
          />
        ))}

        {/* 큰 노드에 글로우 링 */}
        {NODES.filter((n) => n.r >= 2.4).map((node) => (
          <motion.circle
            key={`glow-${node.id}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r + 2}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.6, 0.8] }}
            transition={{
              duration: 3.2,
              delay: node.delay + 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* ── 그라디언트 비네트 오버레이 ─────────────────────── */}
      <div
        className="absolute inset-0 bg-linear-to-b from-brand-dark/85 via-brand-dark/40 to-brand-dark/80"
        aria-hidden="true"
      />
      {/* 좌우 페이드 */}
      <div
        className="absolute inset-0 bg-linear-to-r from-brand-dark/60 via-transparent to-brand-dark/60"
        aria-hidden="true"
      />

      {/* ── 메인 콘텐츠 ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 태그라인 */}
        <motion.p
          variants={tagVariants}
          className="text-blue-400 text-[10px] sm:text-xs font-semibold uppercase mb-6 tracking-[0.18em]"
        >
          Trusted IT Security &amp; Solution Partner
        </motion.p>

        {/* 메인 타이틀 */}
        <motion.h1
          variants={itemVariants}
          className="text-white text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.2] tracking-tight mb-6 whitespace-pre-line"
        >
          {"기술과 신뢰의\n다리를 잇다"}
        </motion.h1>

        {/* 서브 타이틀 구분선 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-12 h-px bg-blue-500/50" />
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="w-12 h-px bg-blue-500/50" />
        </motion.div>

        {/* 서브텍스트 */}
        <motion.p
          variants={itemVariants}
          className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mb-12 whitespace-pre-line"
        >
          {"정보보안 컨설팅부터 IT SI/NI, 통신사 부가서비스까지\n기업의 디지털 전환을 위한 올인원 파트너"}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          {/* Primary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, backgroundColor: "#3B82F6" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-secondary text-white font-semibold text-sm shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 transition-shadow"
          >
            견적 문의하기
            <ArrowRight size={16} />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#services"
            whileHover={{ scale: 1.04, borderColor: "#3B82F6", color: "#93C5FD" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/25 text-white/80 font-semibold text-sm hover:border-blue-400 hover:text-blue-300 transition-colors"
          >
            서비스 살펴보기
          </motion.a>
        </motion.div>

        {/* 통계 뱃지 (limesec 스타일 — 신뢰 지표) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { value: "5+",   label: "년 업력"        },
            { value: "300+", label: "완료 프로젝트"  },
            { value: "99%",  label: "고객 만족도"    },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-white font-bold text-2xl sm:text-3xl leading-none">
                {stat.value}
              </span>
              <span className="text-white/40 text-xs tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── 스크롤 인디케이터 ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.9 }}
        aria-hidden="true"
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.4,
          }}
        >
          <ChevronDown size={22} className="text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
