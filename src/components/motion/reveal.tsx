"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = "power3.out";

type RevealUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  trigger?: "scroll" | "mount";
  start?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function RevealUp({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  y = 24,
  duration = 1.05,
  trigger = "scroll",
  start = "top 88%",
  as: Tag = "div",
}: RevealUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = Array.from(root.children) as HTMLElement[];
      if (!targets.length) return;

      gsap.set(targets, { y, autoAlpha: 0 });
      const tween = {
        y: 0,
        autoAlpha: 1,
        duration,
        ease: EASE,
        stagger,
        delay,
      };

      if (trigger === "mount") {
        gsap.to(targets, tween);
        return;
      }

      gsap.to(targets, {
        ...tween,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });
    },
    { scope: ref }
  );

  const Tag2 = Tag as React.ElementType;
  return (
    <Tag2 ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag2>
  );
}

type RevealTextProps = {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  trigger?: "scroll" | "mount";
  start?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Splits text into word spans inside per-line containers (manual line splits via
 * <br/> in the source), then masks each line and animates words up. For most
 * use cases pass a string; for line-broken headings, wrap each line in its own
 * <RevealText>.
 */
export function RevealText({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  y = 110,
  duration = 1.15,
  trigger = "scroll",
  start = "top 92%",
  as: Tag = "span",
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const words = root.querySelectorAll("[data-word]");
      if (!words.length) return;

      gsap.set(words, { yPercent: y, autoAlpha: 0 });

      const tween = {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        ease: EASE,
        stagger,
        delay,
      };

      if (trigger === "mount") {
        gsap.to(words, tween);
        return;
      }

      gsap.to(words, {
        ...tween,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });
    },
    { scope: ref as React.MutableRefObject<HTMLElement> }
  );

  const Tag2 = Tag as React.ElementType;
  const words = children.split(/(\s+)/);

  return (
    <Tag2
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <span data-word style={{ display: "inline-block", willChange: "transform" }}>
              {w}
            </span>
          </span>
        );
      })}
    </Tag2>
  );
}
