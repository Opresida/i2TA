import { useRef, ElementType, ComponentPropsWithoutRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const customVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: (animationNum: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay: animationNum * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const motionDiv = motion.div;
const motionSection = motion.section;
const motionSpan = motion.span;
const motionP = motion.p;
const motionH1 = motion.h1;
const motionH2 = motion.h2;
const motionH3 = motion.h3;

const motionTagMap: Record<string, typeof motion.div> = {
  div: motionDiv,
  section: motionSection,
  span: motionSpan,
  p: motionP,
  h1: motionH1,
  h2: motionH2,
  h3: motionH3,
};

type TimelineContentProps<T extends ElementType = "div"> = {
  as?: T;
  animationNum?: number;
  once?: boolean;
  threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum = 0,
  once = true,
  threshold = 0.15,
  children,
  className,
  style,
  ...rest
}: TimelineContentProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const tag = (as ?? "div") as string;
  const MotionTag = (motionTagMap[tag] ?? motionDiv) as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      className={className}
      style={style}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}
