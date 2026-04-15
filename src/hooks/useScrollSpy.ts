"use client";

import { useState, useEffect, useRef } from "react";

/* =========================================================
   useScrollSpy
   =========================================================
   현재 스크롤 위치를 기반으로 활성 섹션 ID를 반환합니다.
   Navbar 하이라이트, 사이드 목차 등에 활용합니다.

   @example
   const SECTION_IDS = ["about", "services", "contact"];
   const activeId = useScrollSpy(SECTION_IDS);
   ========================================================= */

export interface ScrollSpyOptions {
  /**
   * IntersectionObserver threshold.
   * 섹션이 뷰포트에 얼마나 보여야 활성으로 인식할지 (0 ~ 1).
   * 기본값: 0.4
   */
  threshold?: number;
  /**
   * rootMargin — 네비게이션 바 높이만큼 위쪽을 줄여 정밀도를 높입니다.
   * 기본값: "-80px 0px -40% 0px"
   */
  rootMargin?: string;
}

/**
 * 섹션 ID 배열을 받아 현재 화면에 보이는 섹션의 ID를 반환합니다.
 *
 * @param sectionIds - 감시할 section#id 목록 (module-level 상수 권장)
 * @param options    - IntersectionObserver 옵션
 * @returns 현재 활성 섹션의 ID 문자열 (초기값: "")
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  { threshold = 0.4, rootMargin = "-80px 0px -40% 0px" }: ScrollSpyOptions = {}
): string {
  const [activeId, setActiveId] = useState<string>("");

  /*
   * idsRef — sectionIds 배열을 ref에 보관해 effect 재실행을 방지합니다.
   * sectionIds가 모듈 상수라면 불필요하지만, 런타임에 변경되는 경우를 대비합니다.
   */
  const idsRef = useRef<readonly string[]>(sectionIds);

  useEffect(() => {
    const ids = idsRef.current;
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold, rootMargin }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [threshold, rootMargin]); // idsRef는 안정적이므로 deps에서 제외

  return activeId;
}
