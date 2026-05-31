"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Sparkle = {
  /** percent across the container (0-100) */
  x: number;
  /** percent down the container (0-100) */
  y: number;
  /** rendered size in px */
  size: number;
  /** seconds before first twinkle */
  delay: number;
  /** seconds between repeats */
  repeatDelay?: number;
};

/**
 * Positions hand-placed inside the S-mark area so sparkles read as flares
 * coming from the cobalt dot pattern, not as decorations sitting on top.
 */
const STARS: Sparkle[] = [
  { x: 16, y: 14, size: 11, delay: 0 },
  { x: 38, y: 18, size: 8, delay: 0.9 },
  { x: 62, y: 16, size: 10, delay: 1.8 },
  { x: 84, y: 12, size: 7, delay: 2.7 },
  { x: 22, y: 36, size: 8, delay: 0.5 },
  { x: 34, y: 48, size: 9, delay: 1.4 },
  { x: 72, y: 52, size: 11, delay: 2.3 },
  { x: 86, y: 60, size: 7, delay: 3.2 },
  { x: 18, y: 78, size: 9, delay: 1.1 },
  { x: 44, y: 86, size: 8, delay: 2.0 },
  { x: 64, y: 82, size: 11, delay: 2.9 },
  { x: 82, y: 76, size: 9, delay: 3.8 },
];

function StarShape({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block", filter: "drop-shadow(0 0 4px rgba(47, 102, 255, 0.45))" }}
    >
      <path
        d="M12 0 L13.4 10.6 L24 12 L13.4 13.4 L12 24 L10.6 13.4 L0 12 L10.6 10.6 Z"
        fill="var(--color-cobalt)"
      />
    </svg>
  );
}

type SparklesProps = {
  stars?: Sparkle[];
  className?: string;
};

/**
 * Twinkles inside the S-mark area. Each star pops to full size with a small
 * rotation, holds a beat, then fades out. Long, varied repeat delays keep the
 * cumulative effect gentle rather than busy.
 */
export function Sparkles({ stars = STARS, className }: SparklesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const els = root.querySelectorAll<HTMLElement>("[data-star]");
      els.forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        const repeatDelay = parseFloat(el.dataset.repeatDelay || "4.5");
        gsap.set(el, { scale: 0, autoAlpha: 0, rotate: -8 });
        gsap.to(el, {
          keyframes: [
            { scale: 1, autoAlpha: 1, rotate: 8, duration: 0.85, ease: "power2.out" },
            { scale: 1, autoAlpha: 1, rotate: 8, duration: 0.4, ease: "none" },
            { scale: 0, autoAlpha: 0, rotate: 24, duration: 1.05, ease: "power2.in" },
          ],
          delay,
          repeat: -1,
          repeatDelay,
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <div
          key={i}
          data-star
          data-delay={s.delay}
          data-repeat-delay={s.repeatDelay ?? 4 + (i % 5) * 0.8}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        >
          <StarShape size={s.size} />
        </div>
      ))}
    </div>
  );
}
