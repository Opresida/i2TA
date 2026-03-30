import { useState, useEffect, useCallback, useRef } from "react";
import { Transition } from "@headlessui/react";
import { Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
  img: string;
  accent: "cyan" | "purple";
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoRotateInterval?: number;
}

function getAccentStyles(accent: "cyan" | "purple") {
  const isCyan = accent === "cyan";
  return {
    color: isCyan ? "var(--i2ta-cyan)" : "var(--i2ta-purple)",
    bgLight: isCyan ? "rgba(0,224,255,0.07)" : "rgba(123,63,228,0.1)",
    borderLight: isCyan ? "rgba(0,224,255,0.18)" : "rgba(123,63,228,0.25)",
    iconBg: isCyan ? "rgba(0,224,255,0.12)" : "rgba(123,63,228,0.15)",
    iconBorder: isCyan ? "rgba(0,224,255,0.25)" : "rgba(123,63,228,0.3)",
    avatarBorder: isCyan ? "rgba(0,224,255,0.5)" : "rgba(123,63,228,0.5)",
    activeBtnBg: isCyan ? "rgba(0,224,255,0.15)" : "rgba(123,63,228,0.2)",
    activeBtnBorder: isCyan ? "rgba(0,224,255,0.5)" : "rgba(123,63,228,0.6)",
  };
}

export default function TestimonialSlider({
  testimonials,
  autoRotateInterval = 7000,
}: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [show, setShow] = useState(true);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setShow(false);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setActiveIndex(index);
        setShow(true);
      }, 200);
    },
    [activeIndex]
  );

  const handleManualSelect = (index: number) => {
    setIsAutoRotating(false);
    goTo(index);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isAutoRotating || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setShow(false);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setShow(true);
      }, 200);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isAutoRotating, autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];
  const s = getAccentStyles(active.accent);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="glass-card p-8 md:p-12 relative overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${s.bgLight} 0%, rgba(255,255,255,0.008) 100%)`,
          borderColor: s.borderLight,
          minHeight: "300px",
        }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${s.bgLight} 0%, transparent 60%)`,
          }}
        />

        <Transition
          show={show}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <div className="relative z-10 flex flex-col gap-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: s.iconBg,
                border: `1px solid ${s.iconBorder}`,
                color: s.color,
              }}
            >
              <Quote size={18} />
            </div>

            <p
              className="text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "#D8E0EC" }}
            >
              &ldquo;{active.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <img
                src={active.img}
                alt={active.name}
                width={48}
                height={48}
                className="rounded-full flex-shrink-0"
                style={{
                  border: `2px solid ${s.avatarBorder}`,
                }}
              />
              <div>
                <p
                  className="font-display font-semibold text-base"
                  style={{ color: "var(--i2ta-white)" }}
                >
                  {active.name}
                </p>
                <p className="text-sm" style={{ color: "var(--i2ta-gray)" }}>
                  {active.role} · {active.org}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {testimonials.map((t, i) => {
          const ts = getAccentStyles(t.accent);
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => handleManualSelect(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: isActive ? ts.activeBtnBg : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? ts.activeBtnBorder : "rgba(255,255,255,0.08)"}`,
                color: isActive ? ts.color : "var(--i2ta-gray)",
                boxShadow: isActive ? `0 0 16px ${ts.activeBtnBg}` : "none",
              }}
            >
              <img
                src={t.img}
                alt={t.name}
                width={24}
                height={24}
                className="rounded-full"
                style={{
                  border: `1px solid ${isActive ? ts.avatarBorder : "rgba(255,255,255,0.1)"}`,
                }}
              />
              <span className="font-display font-semibold text-xs whitespace-nowrap">
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
