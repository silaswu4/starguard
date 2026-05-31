"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MarqueeProps = {
  children: ReactNode;
  /** seconds per loop */
  speed?: number;
  /** gap between items in px */
  gap?: number;
  /** slow the loop to a near-stop while the marquee is hovered */
  slowOnHover?: boolean;
  className?: string;
  reverse?: boolean;
};

/**
 * Renders children twice side by side and translates the track by half its
 * width on an infinite loop. Children must be a single flex row of items.
 */
export function Marquee({
  children,
  speed = 30,
  gap = 48,
  slowOnHover = false,
  className,
  reverse = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const distance = -track.scrollWidth / 2;
      const tween = gsap.to(track, {
        x: reverse ? -distance : distance,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      if (!slowOnHover) return;

      const onEnter = () =>
        gsap.to(tween, { timeScale: 0.15, duration: 0.5, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(tween, { timeScale: 1, duration: 0.7, ease: "power2.out" });

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`.trim()}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ gap: `${gap}px`, willChange: "transform" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
