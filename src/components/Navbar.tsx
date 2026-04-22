"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types";
import { useScrollSpy } from "@/hooks/useScrollSpy";

/* =========================================================
   Nav Items — 섹션 앵커 링크
   ========================================================= */
const NAV_ITEMS: NavItem[] = [
  { label: "회사소개", href: "#about"    },
  { label: "서비스",   href: "#services" },
  { label: "사업영역", href: "#business" },
  { label: "문의하기", href: "#contact"  },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

/* =========================================================
   framer-motion Variants
   ========================================================= */
const navVariants = {
  transparent: {
    backgroundColor: "#0F2B5B",
    backdropFilter: "blur(0px)",
    borderBottomColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none",
  },
  solid: {
    backgroundColor: "#0F2B5B",
    backdropFilter: "blur(12px)",
    borderBottomColor: "rgba(30, 91, 198, 0.3)",
    boxShadow: "0 2px 24px rgba(10, 22, 40, 0.45)",
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};

const iconVariants = {
  initial: { opacity: 0, scale: 0.6, rotate: -90 },
  animate: { opacity: 1, scale: 1,   rotate: 0   },
  exit:    { opacity: 0, scale: 0.6, rotate:  90 },
};

/* =========================================================
   Navbar Component
   ========================================================= */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* 스크롤 감지 → nav 배경 전환 */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 스크롤 시 모바일 메뉴 자동 닫힘 */
  useEffect(() => {
    if (isScrolled) setIsMenuOpen(false);
  }, [isScrolled]);

  /* 활성 섹션 감지 — useScrollSpy 훅 위임 */
  const activeSection = useScrollSpy(NAV_SECTION_IDS);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isScrolled ? "solid" : "transparent"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* 로고 */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={handleNavClick}
          >
            {/* 브릿지 아이콘 — 텍스트 로고 */}
            <span className="text-white font-bold text-lg tracking-[0.18em] group-hover:text-blue-300 transition-colors duration-200">
              BRIDGE
            </span>
            <span className="w-px h-5 bg-white/30" aria-hidden="true" />
            <span className="text-blue-400 font-bold text-lg tracking-[0.18em] group-hover:text-blue-300 transition-colors duration-200">
              AUCTION
            </span>
          </a>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center gap-8" aria-label="주 내비게이션">
            {NAV_ITEMS.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors duration-200 py-1
                    ${isActive
                      ? "text-blue-400"
                      : "text-white/70 hover:text-white"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}

            {/* 문의하기 강조 버튼 */}
            <a
              href="#contact"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200"
            >
              상담 신청
            </a>
          </nav>

          {/* 햄버거 버튼 (모바일) */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "x" : "menu"}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* 모바일 슬라이드 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden bg-brand-primary/95 backdrop-blur-md border-t border-blue-800/30"
            >
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b border-white/5 transition-colors duration-150
                      ${isActive
                        ? "text-blue-400 bg-blue-900/30"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {isActive && (
                      <span className="w-1 h-4 bg-blue-400 rounded-full mr-3 shrink-0" aria-hidden="true" />
                    )}
                    {item.label}
                  </a>
                );
              })}

              {/* 모바일 상담 신청 */}
              <div className="px-6 py-5">
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="block text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200"
                >
                  상담 신청하기
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* fixed nav 높이만큼 스페이서 — hero 섹션 겹침 방지 */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
