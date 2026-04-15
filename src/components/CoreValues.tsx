"use client";

import { motion } from "framer-motion";
import { Shield, Server, Handshake, Zap } from "lucide-react";
import type { SectionProps } from "@/types";

/* =========================================================
   데이터 상수
   ========================================================= */
const VALUES = [
  {
    icon: Shield,
    title: "보안 전문성",
    desc: "KISA, ISMS 인증 기반의 체계적인 보안 컨설팅",
    detail:
      "국가공인 보안 기관과 협력하여 기업 환경에 최적화된 보안 아키텍처를 설계합니다.",
    accent: "#3B82F6",
  },
  {
    icon: Server,
    title: "기술 역량",
    desc: "SI/NI 전 분야 설계·구축·운영 원스톱 서비스",
    detail:
      "네트워크 설계부터 서버 구축, 유지보수까지 단일 파트너로 모든 것을 해결합니다.",
    accent: "#1E5BC6",
  },
  {
    icon: Handshake,
    title: "신뢰 파트너십",
    desc: "장기적 관점의 고객 맞춤형 솔루션 제공",
    detail:
      "단기 납품이 아닌 지속적인 관계를 통해 고객 비즈니스와 함께 성장합니다.",
    accent: "#0F2B5B",
  },
  {
    icon: Zap,
    title: "신속 대응",
    desc: "24/7 모니터링 및 즉각적인 기술 지원 체계",
    detail:
      "365일 24시간 전담 NOC 운영으로 장애를 사전 차단하고 최소 복구 시간을 보장합니다.",
    accent: "#3B82F6",
  },
];

/* =========================================================
   framer-motion Variants
   ========================================================= */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/* =========================================================
   CoreValues Component
   ========================================================= */
export default function CoreValues({ className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-slate-50 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
          >
            CORE VALUES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            핵심 가치
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            브릿지옥션이 고객과의 약속을 지키는 4가지 핵심 원칙
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
            style={{ originX: 0.5 }}
            className="mt-4 h-1 w-14 rounded-full bg-brand-secondary mx-auto"
          />
        </div>

        {/* ── 카드 그리드 ────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className="group relative bg-white rounded-2xl p-8 border-t-2 border-transparent hover:border-brand-accent shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
              >
                {/* 호버 배경 글로우 */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                {/* 아이콘 래퍼 */}
                <div className="relative mb-6 w-fit">
                  <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors duration-300">
                    <Icon
                      size={28}
                      className="text-brand-secondary group-hover:text-brand-accent transition-colors duration-300"
                    />
                  </div>
                  {/* 아이콘 글로우 도트 */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100" />
                </div>

                {/* 텍스트 */}
                <h3 className="text-text-primary text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors duration-200">
                  {val.title}
                </h3>
                <p className="text-brand-secondary text-sm font-semibold mb-3 leading-snug">
                  {val.desc}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {val.detail}
                </p>

                {/* 하단 "더보기" 링크 — 호버 시 노출 */}
                <div className="mt-5 flex items-center gap-1.5 text-brand-accent text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>자세히 보기</span>
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200 inline-block">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── 하단 CTA 배너 ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl bg-brand-primary"
        >
          <div>
            <p className="text-white font-bold text-lg mb-1">
              브릿지옥션의 기술력을 직접 경험해보세요
            </p>
            <p className="text-blue-300/70 text-sm">
              무료 보안 진단 및 IT 컨설팅 상담을 신청하실 수 있습니다.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-accent hover:bg-blue-400 text-white font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
          >
            무료 상담 신청
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
