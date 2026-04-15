import Navbar    from "@/components/Navbar";
import Hero       from "@/components/Hero";
import About      from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Services   from "@/components/Services";
import Process    from "@/components/Process";
import Partners   from "@/components/Partners";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <CoreValues />
        <Services />
        <Process />
        <Partners />

        {/* 향후 추가될 섹션 */}
        <section
          id="business"
          className="py-24 sm:py-32 bg-slate-50 flex items-center justify-center text-slate-400 text-sm"
        >
          사업영역 섹션 (준비 중)
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
