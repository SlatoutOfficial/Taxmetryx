"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  interval?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  interval = 5000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;

    let activeAnimation: { stop: () => void } | null = null;

    const runAnimation = () => {
      motionVal.set(0);
      if (ref.current) {
        ref.current.textContent = `0${suffix}`;
      }
      activeAnimation = animate(motionVal, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(latest)}${suffix}`;
          }
        },
      });
    };

    // Run immediately when in view
    runAnimation();

    // Automatically re-run every 5 seconds
    const timer = setInterval(() => {
      runAnimation();
    }, interval);

    return () => {
      clearInterval(timer);
      activeAnimation?.stop();
    };
  }, [isInView, motionVal, value, suffix, duration, interval]);

  return <span ref={ref}>0{suffix}</span>;
}
