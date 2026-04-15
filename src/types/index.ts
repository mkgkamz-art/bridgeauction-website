/* =========================================================
   브릿지옥션 (Bridge Auction) — 공통 타입 정의
   ========================================================= */

/* ---------------------------------------------------------
   Navigation
   --------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/* ---------------------------------------------------------
   서비스 (Service)
   --------------------------------------------------------- */

export type ServiceCategory =
  | "security"      // 정보보안 컨설팅
  | "si-ni"         // IT SI/NI
  | "telecom";      // 통신사 부가서비스

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  href?: string;
}

/* ---------------------------------------------------------
   실적 / 수치 (Stats)
   --------------------------------------------------------- */

export interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}

/* ---------------------------------------------------------
   파트너사 / 고객사 (Partner)
   --------------------------------------------------------- */

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  href?: string;
}

/* ---------------------------------------------------------
   뉴스 / 공지사항 (News)
   --------------------------------------------------------- */

export type NewsCategory = "notice" | "news" | "press";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  title: string;
  summary?: string;
  publishedAt: string;   // ISO 8601 날짜 문자열
  href?: string;
  thumbnailUrl?: string;
}

/* ---------------------------------------------------------
   팀원 (TeamMember)
   --------------------------------------------------------- */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

/* ---------------------------------------------------------
   문의 양식 (ContactForm)
   --------------------------------------------------------- */

export type InquiryType =
  | "security"
  | "si-ni"
  | "telecom"
  | "partnership"
  | "other";

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  message: string;
  agreePrivacy: boolean;
}

/* ---------------------------------------------------------
   공통 API 응답 (ApiResponse)
   --------------------------------------------------------- */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/* ---------------------------------------------------------
   페이지 섹션 Props 베이스 (SectionProps)
   --------------------------------------------------------- */

export interface SectionProps {
  className?: string;
  id?: string;
}
