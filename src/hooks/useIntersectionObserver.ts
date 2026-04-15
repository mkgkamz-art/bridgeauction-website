"use client";

import { useEffect, useRef } from "react";

/* =========================================================
   useIntersectionObserver
   =========================================================
   요소가 뷰포트에 진입하면 CSS 클래스를 추가하는 훅.
   globals.css의 .fade-hidden + .is-visible 패턴과 함께 사용합니다.

   @example
   const ref = useIntersectionObserver<HTMLDivElement>();
   return <div ref={ref} className="fade-hidden">...</div>
   ========================================================= */

export interface IntersectionObserverOptions {
  /** 교차 비율 임계값 (0 ~ 1). 기본값: 0.1 */
  threshold?: number | number[];
  /** 루트 마진 (CSS margin 형식). 기본값: "0px" */
  rootMargin?: string;
  /** true면 뷰포트 진입 시 1회만 작동하고 옵저버를 해제합니다. 기본값: true */
  once?: boolean;
  /** 교차 시 추가할 CSS 클래스. 기본값: "is-visible" */
  visibleClass?: string;
  /** 교차 해제 시 제거할 CSS 클래스 (once: false일 때 유효). 기본값: visibleClass */
  hiddenClass?: string;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
  visibleClass = "is-visible",
  hiddenClass,
}: IntersectionObserverOptions = {}): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(visibleClass);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          el.classList.remove(hiddenClass ?? visibleClass);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, visibleClass, hiddenClass]);

  return ref;
}
