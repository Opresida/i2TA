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
  const MotionTag = motion.create(tag) as typeof motion.div;

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
