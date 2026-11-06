"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Hand-drawn decorative elements — give the site a human,
   crafted, editorial feel rather than a templated corporate look.
   ───────────────────────────────────────────────────────────── */

/**
 * Hand-drawn squiggly underline — sits beneath a word or heading.
 * Variants: gold (sage green), navy, white (for dark backgrounds).
 */
export function Squiggle({
  color = "gold",
  className,
  width = 120,
  animated = false,
}: {
  color?: "gold" | "navy" | "white";
  className?: string;
  width?: number;
  animated?: boolean;
}) {
  const stroke =
    color === "gold"
      ? "oklch(0.555 0.072 148)"
      : color === "navy"
        ? "oklch(0.328 0.071 254)"
        : "white";
  return (
    <svg
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", maxWidth: width, height: "0.45em", display: "inline-block" }}
      aria-hidden="true"
    >
      <motion.path
        d="M0,4 Q15,1 30,4 T60,4 T90,4 T120,4"
        stroke={stroke}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={animated ? { duration: 0.9, ease: "easeInOut" } : undefined}
      />
    </svg>
  );
}

/**
 * Organic blob shape — soft, asymmetric, painted-feel background element.
 * Use behind hero content, behind section headings, or as decorative anchor.
 */
export function OrganicBlob({
  className,
  variant = "navy",
  opacity = 1,
}: {
  className?: string;
  variant?: "navy" | "gold" | "cream";
  opacity?: number;
}) {
  const fill =
    variant === "navy"
      ? "oklch(0.328 0.071 254)"
      : variant === "gold"
        ? "oklch(0.555 0.072 148)"
        : "oklch(0.96 0.008 75)";
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M336,287C354,247 354,200 339,158C324,116 293,79 254,67C215,55 167,67 124,89C81,111 43,144 36,185C29,226 53,275 92,300C131,325 185,326 227,319C269,312 299,304 318,295C336,286 334,287 336,287Z"
        fill={fill}
        transform="translate(0 0)"
      />
    </svg>
  );
}

/**
 * Hand-drawn arrow — used as marginalia / annotation element.
 * Rotates around its mid-point so it can point any direction.
 */
export function HandDrawnArrow({
  className,
  color = "gold",
  rotate = 0,
}: {
  className?: string;
  color?: "gold" | "navy" | "white";
  rotate?: number;
}) {
  const stroke =
    color === "gold"
      ? "oklch(0.555 0.072 148)"
      : color === "navy"
        ? "oklch(0.328 0.071 254)"
        : "white";
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M5,25 C15,15 25,30 40,22 C50,17 55,28 65,20"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M58,15 L65,20 L60,28"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn circle — emphasises a word or phrase as if marked with a pen.
 */
export function HandDrawnCircle({
  className,
  color = "gold",
}: {
  className?: string;
  color?: "gold" | "navy" | "white";
}) {
  const stroke =
    color === "gold"
      ? "oklch(0.555 0.072 148)"
      : color === "navy"
        ? "oklch(0.328 0.071 254)"
        : "white";
  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <path
        d="M30,40 C30,18 80,8 130,12 C180,16 190,30 180,50 C170,70 100,75 50,68 C20,64 28,52 30,40 Z"
        stroke={stroke}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/**
 * Ink dot — small decorative bullet point that feels hand-pressed.
 */
export function InkDot({
  className,
  color = "gold",
  size = 8,
}: {
  className?: string;
  color?: "gold" | "navy" | "white";
  size?: number;
}) {
  const fill =
    color === "gold"
      ? "oklch(0.555 0.072 148)"
      : color === "navy"
        ? "oklch(0.328 0.071 254)"
        : "white";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2,5 C2,3 4,2 6,3 C8,4 8,6 6,7 C4,8 2,7 2,5 Z"
        fill={fill}
      />
    </svg>
  );
}
