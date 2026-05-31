"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Subtle magnetic pull toward cursor on hover. Wrap a CTA in this to get a
 * tactile feel without overdoing it.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const child = el.firstElementChild as HTMLElement | null;
      if (!child) return;

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(child, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      const reset = () => {
        gsap.to(child, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`.trim()}>
      {children}
    </span>
  );
}
