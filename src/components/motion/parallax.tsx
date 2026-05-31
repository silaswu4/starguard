"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxYProps = {
  children: ReactNode;
  className?: string;
  /** translate range in px from start to end (negative = upward) */
  range?: number;
  start?: string;
  end?: string;
};

export function ParallaxY({
  children,
  className,
  range = -80,
  start = "top bottom",
  end = "bottom top",
}: ParallaxYProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: range,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.8,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
