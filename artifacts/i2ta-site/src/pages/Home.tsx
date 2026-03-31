import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVisionValues from "@/components/MissionVisionValues";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Impact from "@/components/Impact";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Researchers from "@/components/Researchers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import { useLoaderDone } from "@/contexts/LoaderContext";

export default function Home() {
  const loaderDone = useLoaderDone();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    if (loaderDone) {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    }

    return () => observer.disconnect();
  }, [loaderDone]);

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      <Navbar />
      <Hero />
      <About />
      <MissionVisionValues />
      <Services />
      <Differentials />
      <Impact />
      <Testimonials />
      <Partners />
      <Researchers />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
