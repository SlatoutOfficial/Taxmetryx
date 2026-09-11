"use client";

import React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

// Luxury editorial transition curves
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
export const SMOOTH_EASE = [0.21, 0.47, 0.32, 0.98] as const;

export const defaultViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -50px 0px",
} as const;

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
  };
}

export function FadeIn({
  children,
  direction = "up",
  distance = 32,
  delay = 0,
  duration = 0.75,
  className = "",
  viewport = defaultViewport,
  ...props
}: FadeInProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "none":
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  as?: "div" | "address" | "ul" | "ol" | "section";
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
  };
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay ?? 0.12,
      delayChildren: custom.delayChildren ?? 0.05,
    },
  }),
};

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.05,
  className = "",
  as = "div",
  viewport = defaultViewport,
  ...props
}: StaggerContainerProps) {
  const Component = (motion as Record<string, any>)[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={{ staggerDelay, delayChildren }}
      variants={staggerContainerVariants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
    },
  },
};

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "span";
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  ...props
}: StaggerItemProps) {
  const Component = (motion as Record<string, any>)[as] || motion.div;

  return (
    <Component
      variants={staggerItemVariants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

interface LineRevealProps extends HTMLMotionProps<"div"> {
  className?: string;
  delay?: number;
  duration?: number;
}

export function LineReveal({
  className = "reference-rule",
  delay = 0.15,
  duration = 0.7,
  ...props
}: LineRevealProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={defaultViewport}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
      {...props}
    />
  );
}

interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
  };
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.75,
  initialScale = 0.94,
  className = "",
  viewport = defaultViewport,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface HoverLiftProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yOffset?: number;
  className?: string;
}

export function HoverLift({
  children,
  yOffset = -4,
  className = "",
  ...props
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: yOffset }}
      transition={{ duration: 0.25, ease: SMOOTH_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

