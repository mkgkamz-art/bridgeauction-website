"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

/* =========================================================
   설정 — Formspree/EmailJS 전환 시 이 값만 교체
   =========================================================
   Formspree: "https://formspree.io/f/YOUR_FORM_ID"
   EmailJS  : "" (빈 값 유지 후 handleSubmit 내 SDK 호출로 교체)
   mailto   : "" (기본 fallback)
   ========================================================= */
const FORM_ACTION_URL = process.env.NEXT_PUBLIC_FORM_ACTION_URL ?? "";
const CONTACT_EMAIL   = "contact@reanote.co.kr";

/* =========================================================
   연락처 데이터
   ========================================================= */
const CONTACT_INFO = [
  {
    icon: Phone,
    label: "대표 전화",
    value: "1533-5865",
    href: "tel:15335865",
  },
  {
    icon: Mail,
    label: "이메일",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    label: "주소",
    value: "서울시 금천구 가산디지털2로 70, 1803호",
    href: "https://maps.google.com/?q=서울시+금천구+가산디지털2로+70",
  },
  {
    icon: Clock,
    label: "영업시간",
    value: "월 – 금  10:00 ~ 18:00",
    href: null,
  },
];

const INQUIRY_OPTIONS = [
  { value: "security", label: "정보보안 컨설팅" },
  { value: "si-ni",    label: "IT SI / NI" },
  { value: "telecom",  label: "통신사 부가서비스" },
  { value: "other",    label: "기타" },
] as const;

/* =========================================================
   폼 상태 타입
   ========================================================= */
interface FormData {
  company:     string;
  name:        string;
  phone:       string;
  email:       string;
  inquiryType: string;
  message:     string;
  agreePrivacy: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  company:      "",
  name:         "",
  phone:        "",
  email:        "",
  inquiryType:  "",
  message:      "",
  agreePrivacy: false,
};

/* =========================================================
   입력 컴포넌트 (공통)
   ========================================================= */
function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-text-primary text-xs font-semibold">
        {label}
        {required && <span className="text-brand-accent ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-red-500 text-xs"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-text-primary placeholder:text-slate-400 bg-white
   transition-all duration-200 outline-none
   focus:ring-2 focus:ring-offset-0
   ${
     error
       ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
       : "border-slate-300 focus:border-brand-secondary focus:ring-brand-accent/20"
   }`;

/* =========================================================
   Contact Component
   ========================================================= */
export default function Contact() {
  const [formData, setFormData]     = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors]         = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  /* 유효성 검사 */
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.company.trim())   e.company     = "회사명을 입력해주세요";
    if (!formData.name.trim())      e.name        = "담당자명을 입력해주세요";
    if (!formData.email.trim())     e.email       = "이메일을 입력해주세요";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                    e.email       = "올바른 이메일 형식이 아닙니다";
    if (!formData.inquiryType)      e.inquiryType = "문의 유형을 선택해주세요";
    if (!formData.message.trim())   e.message     = "문의 내용을 입력해주세요";
    if (!formData.agreePrivacy)     e.agreePrivacy = "개인정보 수집에 동의해주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* 제출 핸들러 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (FORM_ACTION_URL) {
        /* ── Formspree / 외부 엔드포인트 방식 ── */
        const res = await fetch(FORM_ACTION_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify(formData),
        });
        if (res.ok) setSubmitted(true);
      } else {
        /* ── mailto fallback ── */
        const inquiryLabel =
          INQUIRY_OPTIONS.find((o) => o.value === formData.inquiryType)?.label ??
          formData.inquiryType;
        const subject = encodeURIComponent(
          `[브릿지옥션 문의] ${formData.company} — ${inquiryLabel}`
        );
        const body = encodeURIComponent(
          [
            `회사명   : ${formData.company}`,
            `담당자   : ${formData.name}`,
            `연락처   : ${formData.phone || "미입력"}`,
            `이메일   : ${formData.email}`,
            `문의 유형: ${inquiryLabel}`,
            "",
            "── 문의 내용 ──",
            formData.message,
          ].join("\n")
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 섹션 헤더 ─────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-brand-accent text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
          >
            CONTACT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            문의하기
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            궁금하신 사항이나 견적 요청을 남겨주시면 빠르게 연락드립니다
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
            style={{ originX: 0.5 }}
            className="mt-4 h-1 w-14 rounded-full bg-brand-secondary mx-auto"
          />
        </div>

        {/* ── 2컬럼 레이아웃 ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── 왼쪽: 연락처 정보 ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* 상단 배너 */}
            <div className="relative rounded-2xl bg-brand-primary overflow-hidden p-8 mb-8">
              {/* 배경 패턴 */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, #3B82F6 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1E5BC6 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-blue-300 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
                  Get In Touch
                </p>
                <h3 className="text-white text-xl font-bold mb-3 leading-snug">
                  전문가와 직접 상담하세요
                </h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">
                  정보보안, IT 인프라, 통신 부가서비스 전 분야의 전문 컨설턴트가 최적의 솔루션을 제안해드립니다.
                </p>
              </div>
            </div>

            {/* 연락처 목록 */}
            <div className="space-y-4">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                const inner = (
                  <div
                    className={`flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 transition-all duration-200 ${
                      info.href ? "hover:border-brand-secondary/30 hover:bg-brand-light hover:shadow-sm" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} className="text-brand-secondary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-text-secondary text-[11px] font-semibold tracking-wide uppercase mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-text-primary text-sm font-medium leading-snug break-all">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── 오른쪽: 문의 폼 ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── 제출 완료 상태 ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"
                  >
                    <CheckCircle2 size={36} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-text-primary text-xl font-bold">
                    문의가 접수되었습니다
                  </h3>
                  <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
                    빠른 시일 내에 담당자가 연락드리겠습니다.
                    <br />
                    (영업일 기준 1~2일 이내)
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData(INITIAL_FORM); }}
                    className="mt-2 text-brand-secondary text-sm font-semibold hover:text-brand-accent transition-colors duration-200"
                  >
                    새 문의 작성하기
                  </button>
                </motion.div>
              ) : (
                /* ── 폼 ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="mb-1">
                    <h3 className="text-text-primary text-lg font-bold">견적 문의</h3>
                    <p className="text-text-secondary text-sm mt-1">
                      <span className="text-brand-accent font-semibold">*</span> 표시 항목은 필수 입력 사항입니다
                    </p>
                  </div>

                  {/* 회사명 + 담당자명 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="회사명" htmlFor="company" error={errors.company} required>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="브릿지옥션"
                        className={inputClass(errors.company)}
                        autoComplete="organization"
                        aria-invalid={!!errors.company}
                        aria-describedby={errors.company ? "company-error" : undefined}
                      />
                    </Field>
                    <Field label="담당자명" htmlFor="name" error={errors.name} required>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className={inputClass(errors.name)}
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </Field>
                  </div>

                  {/* 연락처 + 이메일 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="연락처" htmlFor="phone" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        className={inputClass(errors.phone)}
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                    </Field>
                    <Field label="이메일" htmlFor="email" error={errors.email} required>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@company.com"
                        className={inputClass(errors.email)}
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </Field>
                  </div>

                  {/* 문의 유형 */}
                  <Field label="문의 유형" htmlFor="inquiryType" error={errors.inquiryType} required>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className={`${inputClass(errors.inquiryType)} appearance-none cursor-pointer pr-10`}
                        aria-invalid={!!errors.inquiryType}
                        aria-describedby={errors.inquiryType ? "inquiryType-error" : undefined}
                      >
                        <option value="" disabled>문의 유형을 선택해주세요</option>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {/* 커스텀 화살표 */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6l4 4 4-4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </Field>

                  {/* 문의 내용 */}
                  <Field label="문의 내용" htmlFor="message" error={errors.message} required>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="문의하실 내용을 자세히 적어주세요. (현황, 규모, 일정 등)"
                      rows={5}
                      className={`${inputClass(errors.message)} resize-none`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                  </Field>

                  {/* 개인정보 동의 */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
                            peer-focus-visible:ring-2 peer-focus-visible:ring-brand-accent/40 peer-focus-visible:ring-offset-1
                            ${
                              formData.agreePrivacy
                                ? "bg-brand-secondary border-brand-secondary"
                                : errors.agreePrivacy
                                ? "border-red-400"
                                : "border-slate-300 group-hover:border-brand-secondary/60"
                            }`}
                        >
                          {formData.agreePrivacy && (
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-text-secondary text-xs leading-relaxed">
                        <span className="text-brand-accent font-semibold">*</span>{" "}
                        개인정보(성명, 연락처, 이메일) 수집·이용에 동의합니다.
                        수집된 정보는 문의 답변 목적으로만 사용됩니다.
                      </span>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs ml-8">
                        <AlertCircle size={11} />
                        {errors.agreePrivacy}
                      </p>
                    )}
                  </div>

                  {/* 제출 버튼 */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="mt-1 w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-brand-secondary disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-brand-primary/20"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        문의하기
                      </>
                    )}
                  </motion.button>

                  {/* Formspree 안내 */}
                  {!FORM_ACTION_URL && (
                    <p className="text-center text-text-secondary/50 text-[10px]">
                      이메일 클라이언트가 열립니다 · Formspree 연동 시 인앱 전송으로 전환
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
