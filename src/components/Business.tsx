"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Network, Smartphone,
  ChevronRight, Building2, Factory,
  Landmark, Zap, ShoppingCart, Truck,
  TrendingUp, Award, Users, Globe,
} from "lucide-react";

/* =========================================================
   사업 영역 데이터
   ========================================================= */
interface Industry {
  name: string;
  icon: React.ElementType;
}

interface Domain {
  id: string;
  icon: React.ElementType;
  tag: string;
  title: string;
  subtitle: string;
  color: string;         // 강조 색상 (Tailwind 클래스)
  bgGradient: string;    // 카드 그라디언트
  desc: string;
  capabilities: { title: string; detail: string }[];
  industries: Industry[];
  stat: { value: string; label: string };
}

const DOMAINS: Domain[] = [
  {
    id: "security",
    icon: ShieldCheck,
    tag: "Information Security",
    title: "정보보안",
    subtitle: "기업의 디지털 자산을 체계적으로 보호합니다",
    color: "text-blue-400",
    bgGradient: "from-blue-900/40 to-brand-primary/60",
    desc: "KISA 인증 전문가 그룹이 기업 환경에 최적화된 전방위 보안 솔루션을 설계하고 운영합니다. 모의해킹부터 24시간 보안관제까지 End-to-End 보안 체계를 구축합니다.",
    capabilities: [
      { title: "취약점 진단 & 모의해킹",   detail: "웹·앱·인프라 전 영역 체계적 보안 점검" },
      { title: "ISMS / ISMS-P 인증",       detail: "인증 취득부터 사후관리까지 원스톱 컨설팅" },
      { title: "보안 솔루션 구축",          detail: "방화벽·IPS·WAF·DLP·EDR 최적 구성" },
      { title: "24×7 보안관제 (SOC)",       detail: "실시간 위협 탐지 및 즉각 대응 체계 운영" },
      { title: "클라우드 보안 설계",         detail: "Zero Trust 기반 클라우드 보안 아키텍처" },
      { title: "개인정보 보호 컨설팅",       detail: "PIPA 준수 체계 수립 및 교육" },
    ],
    industries: [
      { name: "금융",     icon: Landmark },
      { name: "공공",     icon: Building2 },
      { name: "제조",     icon: Factory  },
      { name: "에너지",   icon: Zap      },
    ],
    stat: { value: "300+", label: "보안 프로젝트 완수" },
  },
  {
    id: "si-ni",
    icon: Network,
    tag: "IT SI / NI",
    title: "IT SI / NI",
    subtitle: "안정적인 IT 인프라 환경을 설계하고 구축합니다",
    color: "text-indigo-400",
    bgGradient: "from-indigo-900/40 to-brand-primary/60",
    desc: "네트워크 설계부터 클라우드 전환, 데이터센터 구축까지 기업 IT 전 영역을 단일 파트너로 원스톱 해결합니다. 검증된 기술력으로 최적의 인프라 환경을 제공합니다.",
    capabilities: [
      { title: "네트워크 설계 & 구축",      detail: "LAN/WAN/WLAN 기업 최적 네트워크 아키텍처" },
      { title: "서버 인프라 구축",           detail: "On-Premise · 하이브리드 서버 환경 구성" },
      { title: "클라우드 전환 (MSP)",        detail: "AWS · Azure · GCP 마이그레이션 & 운영" },
      { title: "데이터센터 구축",            detail: "IDC 설계부터 랙 구성, 케이블링까지 턴키" },
      { title: "IT 아웃소싱 & 유지보수",     detail: "전담 엔지니어 상주 및 원격 관리 서비스" },
      { title: "통합 모니터링 시스템",        detail: "전체 인프라 실시간 가시성 확보" },
    ],
    industries: [
      { name: "제조",     icon: Factory      },
      { name: "유통",     icon: ShoppingCart },
      { name: "물류",     icon: Truck        },
      { name: "공공",     icon: Building2    },
    ],
    stat: { value: "150+", label: "인프라 구축 사례" },
  },
  {
    id: "telecom",
    icon: Smartphone,
    tag: "Telecom VAS",
    title: "통신사 부가서비스",
    subtitle: "통신 기반 스마트 비즈니스 환경을 구현합니다",
    color: "text-sky-400",
    bgGradient: "from-sky-900/40 to-brand-primary/60",
    desc: "이동통신 3사 공식 파트너로서 기업 전용 통신 솔루션과 부가서비스를 최적 조건으로 공급합니다. 디지털 전환의 핵심 통신 인프라를 책임집니다.",
    capabilities: [
      { title: "기업 전용 모바일 솔루션",    detail: "MDM · EMM 기반 기업 모바일 환경 구축" },
      { title: "IoT 통신 서비스",            detail: "산업용 IoT 디바이스 통신망 설계 & 운영" },
      { title: "유무선 통합 통신 (UC)",       detail: "음성·영상·메시지 통합 커뮤니케이션 플랫폼" },
      { title: "기업 인터넷 전용회선",        detail: "안정적인 대용량 기업 전용망 구성" },
      { title: "클라우드 PBX / IP 전화",      detail: "장비 없는 클라우드 기반 교환기 서비스" },
      { title: "MVNO / 알뜰폰 지원",         detail: "기업 특화 요금제 설계 및 운영 대행" },
    ],
    industries: [
      { name: "통신",     icon: Globe        },
      { name: "금융",     icon: Landmark     },
      { name: "유통",     icon: ShoppingCart },
      { name: "제조",     icon: Factory      },
    ],
    stat: { value: "5만+", label: "통신 회선 공급" },
  },
];

/* =========================================================
   전체 강점 지표
   ========================================================= */
const STRENGTHS = [
  { icon: TrendingUp, value: "15+",  label: "년 업력",        desc: "2010년 창립 이래 꾸준한 성장" },
  { icon: Award,      value: "10+",  label: "보유 인증",       desc: "KISA·ISO·CC·GS 인증 보유" },
  { icon: Users,      value: "200+", label: "전문 인력",       desc: "분야별 공인 자격 보유 전문가" },
  { icon: Globe,      value: "전국", label: "서비스 커버리지", desc: "서울 본사 + 전국 거점 네트워크" },
];

/* =========================================================
   Framer Motion Variants
   ========================================================= */
const tabVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const capabilityVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const capItemVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.36, ease: "easeOut" as const } },
};

/* =========================================================
   Business Component
   ========================================================= */
export default function Business() {
  const [activeId, setActiveId] = useState<string>("security");
  const active = DOMAINS.find((d) => d.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section
      id="business"
      className="py-24 sm:py-32 bg-brand-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
          >
            BUSINESS AREAS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            사업영역
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            정보보안 · IT SI/NI · 통신사 부가서비스 세 가지 핵심 도메인에서<br className="hidden sm:block" />
            기업의 디지털 혁신을 설계하고 실현합니다
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.28 }}
            style={{ originX: 0.5 }}
            className="mt-4 h-1 w-14 rounded-full bg-brand-secondary mx-auto"
          />
        </div>

        {/* ── 도메인 탭 (3열) ────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isActive = domain.id === activeId;
            return (
              <motion.button
                key={domain.id}
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                }}
                onClick={() => setActiveId(domain.id)}
                whileHover={!isActive ? { y: -3 } : {}}
                whileTap={{ scale: 0.98 }}
                aria-pressed={isActive}
                className={`relative text-left p-6 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  isActive
                    ? "bg-linear-to-br " + domain.bgGradient + " border-brand-secondary/50 shadow-xl shadow-brand-dark/60"
                    : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/8"
                }`}
              >
                {/* 아이콘 */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isActive ? "bg-white/15" : "bg-white/8"}`}>
                  <Icon size={24} className={isActive ? domain.color : "text-slate-400"} />
                </div>

                {/* 태그 */}
                <span className={`block text-[10px] font-bold tracking-[0.16em] uppercase mb-2 ${isActive ? domain.color : "text-slate-500"}`}>
                  {domain.tag}
                </span>

                {/* 제목 */}
                <h3 className={`text-base font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                  {domain.title}
                </h3>

                {/* 활성 통계 */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-1.5"
                  >
                    <span className={"text-lg font-bold " + domain.color}>{domain.stat.value}</span>
                    <span className="text-slate-400 text-xs">{domain.stat.label}</span>
                  </motion.div>
                )}

                {/* 비활성 서비스 수 */}
                {!isActive && (
                  <p className="mt-1.5 text-xs text-slate-500">{domain.capabilities.length}개 역량</p>
                )}

                {/* 활성 인디케이터 */}
                {isActive && (
                  <motion.div
                    layoutId="business-indicator"
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-accent"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── 상세 패널 ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
          >
            {/* 상단 그라디언트 바 */}
            <div className="h-px w-full bg-linear-to-r from-brand-secondary via-brand-accent to-transparent" />

            <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

              {/* ── 왼쪽: 개요 ───────────────────────────── */}
              <div>
                {/* 아이콘 */}
                <div className="w-16 h-16 rounded-2xl bg-brand-secondary/20 border border-brand-secondary/30 flex items-center justify-center mb-6">
                  <ActiveIcon size={30} className={active.color} />
                </div>

                {/* 태그 */}
                <span className={"inline-block text-[10px] font-bold tracking-[0.16em] uppercase mb-3 px-3 py-1 rounded-full bg-white/8 " + active.color}>
                  {active.tag}
                </span>

                {/* 제목 + 서브 */}
                <h3 className="text-white text-2xl font-bold mb-2">{active.title}</h3>
                <p className={"text-sm font-semibold mb-4 " + active.color}>{active.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{active.desc}</p>

                {/* 주요 적용 업종 */}
                <div>
                  <p className="text-white text-xs font-bold tracking-[0.14em] uppercase mb-3 flex items-center gap-2">
                    <span className="w-3 h-px bg-brand-accent" />
                    주요 적용 업종
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.industries.map(({ name, icon: Icon }) => (
                      <div
                        key={name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 border border-white/10 text-slate-300 text-xs font-medium"
                      >
                        <Icon size={12} className="text-slate-400" />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 오른쪽: 세부 역량 ─────────────────────── */}
              <div>
                <p className="text-white text-xs font-bold tracking-[0.14em] uppercase mb-5 flex items-center gap-2">
                  <span className="w-3 h-px bg-brand-accent" />
                  세부 역량
                </p>

                <motion.ul
                  variants={capabilityVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {active.capabilities.map((cap, i) => (
                    <motion.li
                      key={cap.title}
                      variants={capItemVariants}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:border-brand-secondary/40 hover:bg-white/8 transition-all duration-200"
                    >
                      {/* 번호 */}
                      <span className="shrink-0 w-6 h-6 rounded-md bg-brand-secondary/20 flex items-center justify-center text-[10px] font-bold text-brand-accent mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-white text-sm font-semibold mb-0.5 group-hover:text-brand-accent transition-colors duration-200">
                          {cap.title}
                        </p>
                        <p className="text-slate-500 text-xs leading-snug">{cap.detail}</p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mt-8 flex items-center gap-3"
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-brand-accent text-white text-sm font-semibold transition-colors duration-200"
                  >
                    이 분야 문의하기
                    <ChevronRight size={15} />
                  </a>
                  <a
                    href="#services"
                    className="text-slate-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1"
                  >
                    서비스 보기 →
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── 핵심 강점 지표 ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STRENGTHS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 text-center hover:border-brand-secondary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/15 flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-brand-accent" />
                </div>
                <p className="text-white text-2xl font-bold leading-none mb-1">{s.value}</p>
                <p className="text-brand-accent text-xs font-semibold mb-1">{s.label}</p>
                <p className="text-slate-500 text-[11px] leading-snug">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
