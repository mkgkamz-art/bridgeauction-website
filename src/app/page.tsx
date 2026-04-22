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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
