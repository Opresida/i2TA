import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVisionValues from "@/components/MissionVisionValues";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
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

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      <Navbar />
      <Hero />
      <About />
      <MissionVisionValues />
      <Services />
      <Differentials />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
}
