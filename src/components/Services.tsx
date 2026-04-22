"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Network, Smartphone, ChevronRight, ArrowRight, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================================================
   타입
   ========================================================= */
interface ServiceGroup {
  name: string;
  items: string[];
}

interface ServiceData {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  items: string[];
  groups?: ServiceGroup[];   // 그룹 구조 패널용 (optional)
  accentClass: string;       // 카드 hover 테두리
  bgClass: string;           // 아이콘 배경 (비활성)
}

/* =========================================================
   데이터 상수
   ========================================================= */
const SERVICES: ServiceData[] = [
  {
    id: "security",
    icon: ShieldCheck,
    tag: "Security",
    title: "정보보안",
    subtitle: "기업의 디지털 자산을 체계적으로 보호합니다",
    desc: "KISA 인증 전문가 그룹이 모의해킹부터 보안관제까지, 기업 환경에 최적화된 전방위 정보보안 솔루션을 제공합니다.",
    items: [
      "모의해킹 / 취약점 진단",
      "ISMS / ISMS-P 인증 컨설팅",
      "개인정보보호 컨설팅",
      "보안 솔루션 구축 (방화벽·IPS·WAF·DLP)",
      "보안관제 서비스 (SOC)",
      "클라우드 보안 아키텍처 설계",
    ],
    accentClass: "hover:border-blue-400/50",
    bgClass: "bg-blue-50",
  },
  {
    id: "si-ni",
    icon: Network,
    tag: "Infrastructure",
    title: "IT SI/NI",
    subtitle: "안정적인 IT 인프라 환경을 설계·구축합니다",
    desc: "네트워크 설계부터 클라우드 전환, 데이터센터 구축까지 모든 IT 인프라를 단일 파트너로 원스톱 해결합니다.",
    items: [
      "네트워크 설계 및 구축 (LAN/WAN/WLAN)",
      "서버 인프라 구축 및 마이그레이션",
      "클라우드 전환 (AWS · Azure · GCP)",
      "데이터센터 설계 및 구축",
      "IT 아웃소싱 / 유지보수",
      "통합 모니터링 시스템 구축",
    ],
    accentClass: "hover:border-indigo-400/50",
    bgClass: "bg-indigo-50",
  },
  {
    id: "telecom",
    icon: Smartphone,
    tag: "Telecom VAS",
    title: "통신사 부가서비스",
    subtitle: "해외주식노트 · 부동산경매노트 프리미엄 구독 서비스",
    desc: "SKT 공식 파트너로서 통신요금과 통합 청구되는 프리미엄 구독 서비스를 제공합니다. 전문가 분석 리포트와 빅데이터 기반 경매 정보로 스마트한 투자를 지원합니다.",
    items: [
      "일일 리포트", "종목 분석", "시장 뉴스 큐레이션",
      "일 2회 경매 추천", "권리분석", "경공매 전문가 의견",
    ],
    groups: [
      {
        name: "해외주식노트",
        items: ["일일 리포트", "종목 분석", "시장 뉴스 큐레이션"],
      },
      {
        name: "부동산경매노트",
        items: ["일 2회 경매 추천", "권리분석", "경공매 전문가 의견"],
      },
    ],
    accentClass: "hover:border-sky-400/50",
    bgClass: "bg-sky-50",
  },
];

/* =========================================================
   framer-motion Variants
   ========================================================= */
const panelVariants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const listItemVariants = {
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: "easeOut" as const },
  },
};

/* =========================================================
   Services Component
   ========================================================= */
export default function Services() {
  const [activeId, setActiveId] = useState<string>("security");

  const active = SERVICES.find((s) => s.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
          >
            SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            서비스
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            정보보안부터 인프라 구축, 통신 솔루션까지 기업 IT 전 영역을 커버합니다
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

        {/* ── 탭 카드 (3열) ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          role="tablist"
          aria-label="서비스 카테고리"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === activeId;

            return (
              <motion.button
                key={service.id}
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                }}
                onClick={() => setActiveId(service.id)}
                whileHover={!isActive ? { y: -4 } : {}}
                whileTap={{ scale: 0.98 }}
                role="tab"
                id={`tab-${service.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${service.id}`}
                className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  isActive
                    ? "bg-brand-primary border-brand-primary shadow-xl shadow-brand-primary/25"
                    : `bg-white border-slate-200 ${service.accentClass} hover:shadow-lg`
                }`}
              >
                {/* 활성 탭 하단 커넥터 삼각형 */}
                {isActive && (
                  <motion.span
                    layoutId="tab-connector"
                    className="absolute -bottom-3.25 left-1/2 -translate-x-1/2 block w-0 h-0 z-10"
                    style={{
                      borderLeft: "12px solid transparent",
                      borderRight: "12px solid transparent",
                      borderTop: "12px solid #0F2B5B",
                    }}
                  />
                )}

                {/* 아이콘 */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                    isActive ? "bg-white/15" : service.bgClass
                  }`}
                >
                  <Icon
                    size={24}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-white" : "text-brand-secondary"
                    }`}
                  />
                </div>

                {/* 카테고리 태그 */}
                <span
                  className={`block text-[10px] font-bold tracking-[0.18em] uppercase mb-2 transition-colors duration-300 ${
                    isActive ? "text-blue-300" : "text-brand-accent"
                  }`}
                >
                  {service.tag}
                </span>

                {/* 제목 */}
                <h3
                  className={`text-base font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-text-primary"
                  }`}
                >
                  {service.title}
                </h3>

                {/* 비활성 카드에 서비스 개수 표시 */}
                {!isActive && (
                  <p className="mt-1.5 text-xs text-text-secondary">
                    {service.items.length}개 서비스
                  </p>
                )}

                {/* 활성 카드에 체크마크 */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── 확장 패널 ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            tabIndex={0}
            className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {/* 패널 상단 액센트 바 */}
            <div className="h-1 w-full bg-linear-to-r from-brand-secondary via-brand-accent to-brand-secondary/40" />

            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

                {/* ── 왼쪽: 서비스 설명 ────────────────── */}
                <div>
                  {/* 아이콘 블록 */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center mb-6 shadow-lg shadow-brand-primary/30">
                    <ActiveIcon size={30} className="text-white" />
                  </div>

                  {/* 카테고리 태그 */}
                  <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-brand-accent bg-brand-light px-3 py-1 rounded-full mb-3">
                    {active.tag}
                  </span>

                  {/* 제목 */}
                  <h3 className="text-text-primary text-2xl font-bold mb-2">
                    {active.title}
                  </h3>

                  {/* 서브타이틀 */}
                  <p className="text-brand-secondary text-sm font-semibold mb-4 leading-snug">
                    {active.subtitle}
                  </p>

                  {/* 설명 */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-8">
                    {active.desc}
                  </p>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-secondary transition-colors duration-200"
                    >
                      서비스 문의하기
                      <ArrowRight size={15} />
                    </motion.a>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-text-secondary text-sm font-medium hover:border-brand-secondary hover:text-brand-secondary transition-colors duration-200"
                    >
                      <MessageSquare size={15} />
                      온라인 상담
                    </motion.a>
                  </div>
                </div>

                {/* ── 오른쪽: 서비스 목록 ─────────────── */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1 h-4 rounded-full bg-brand-secondary" />
                    <p className="text-text-primary text-xs font-bold tracking-[0.14em] uppercase">
                      {active.groups ? "서비스 구성" : "서비스 목록"}
                    </p>
                  </div>

                  {active.groups ? (
                    /* ── 그룹형 렌더링 (통신사 부가서비스) ── */
                    <motion.div
                      variants={listContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      {active.groups.map((group) => (
                        <div key={group.name}>
                          {/* 그룹 헤더 */}
                          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-brand-secondary/30">
                            <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                            <span className="text-brand-secondary text-sm font-bold">{group.name}</span>
                          </div>
                          {/* 그룹 아이템 */}
                          <ul className="space-y-2">
                            {group.items.map((item, i) => (
                              <motion.li
                                key={item}
                                variants={listItemVariants}
                                className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 hover:border-brand-accent/40 hover:shadow-sm transition-all duration-200 cursor-default"
                              >
                                <div className="relative shrink-0 mt-0.5">
                                  <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors duration-200">
                                    <ChevronRight
                                      size={14}
                                      className="text-brand-secondary group-hover:text-brand-accent transition-colors duration-200 group-hover:translate-x-0.5 transform"
                                    />
                                  </div>
                                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-brand-primary flex items-center justify-center">
                                    <span className="text-white text-[7px] font-bold leading-none">{i + 1}</span>
                                  </span>
                                </div>
                                <span className="text-text-secondary text-sm leading-snug group-hover:text-text-primary transition-colors duration-200">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    /* ── 기존 플랫 리스트 렌더링 ── */
                    <motion.ul
                      variants={listContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {active.items.map((item, i) => (
                        <motion.li
                          key={item}
                          variants={listItemVariants}
                          className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 hover:border-brand-accent/40 hover:shadow-sm transition-all duration-200 cursor-default"
                        >
                          <div className="relative shrink-0 mt-0.5">
                            <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors duration-200">
                              <ChevronRight
                                size={14}
                                className="text-brand-secondary group-hover:text-brand-accent transition-colors duration-200 group-hover:translate-x-0.5 transform"
                              />
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-brand-primary flex items-center justify-center">
                              <span className="text-white text-[7px] font-bold leading-none">{i + 1}</span>
                            </span>
                          </div>
                          <span className="text-text-secondary text-sm leading-snug group-hover:text-text-primary transition-colors duration-200">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {/* 하단 메모 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-6 text-xs text-text-secondary/60 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-text-secondary/40 shrink-0" />
                    서비스는 고객 환경에 따라 맞춤 구성됩니다. 상담을 통해 최적안을 제안해 드립니다.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── 하단 보조 문구 ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <span className="text-text-secondary text-sm">
            어떤 서비스가 필요한지 잘 모르시겠나요?
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-brand-secondary text-sm font-semibold hover:text-brand-accent transition-colors duration-200 group"
          >
            무료 컨설팅 신청하기
            <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
