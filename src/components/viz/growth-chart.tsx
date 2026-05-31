"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stage = {
  stage: string;
  /** semantic value, 0 to 100. Drives bar height via power scaling. */
  pct: number;
  /** big label shown under each bar (e.g. "1%", "30d", "100%") */
  label: string;
  /** smaller note under the label */
  note: string;
};

type GrowthChartProps = {
  stages: Stage[];
  title?: string;
  caption?: string;
};

const CHART_HEIGHT = 240;
const MIN_BAR = 18;

/**
 * Maps a value in [0, 100] to a 0-1 visual ratio with a power curve so
 * small values stay visible without dwarfing the big ones.
 */
function scale(pct: number) {
  const clamped = Math.max(0, Math.min(pct / 100, 1));
  return Math.pow(clamped, 0.45);
}

export function GrowthChart({ stages, title, caption }: GrowthChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const bars = root.querySelectorAll<HTMLElement>("[data-bar]");
      const labels = root.querySelectorAll<HTMLElement>("[data-label]");
      const baseline = root.querySelector<HTMLElement>("[data-baseline]");

      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
      gsap.set(labels, { y: 14, autoAlpha: 0 });
      if (baseline) gsap.set(baseline, { scaleX: 0, transformOrigin: "left" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
        defaults: { ease: "power3.out" },
      });

      if (baseline) tl.to(baseline, { scaleX: 1, duration: 1.0 }, 0);
      tl.to(bars, { scaleY: 1, duration: 1.1, stagger: 0.12 }, 0.1);
      tl.to(labels, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 }, 0.35);
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative w-full rounded-[16px] border border-[color:var(--color-line)] bg-white p-8"
    >
      {(title || caption) && (
        <div className="mb-8 flex items-center justify-between">
          {title && (
            <span className="label-mono text-[color:var(--color-foreground)]">{title}</span>
          )}
          {caption && (
            <span className="label-mono-sm text-[color:var(--color-cobalt-deep)]">{caption}</span>
          )}
        </div>
      )}

      <div className="relative">
        <div
          className="grid items-end gap-4 sm:gap-6 md:gap-10"
          style={{
            gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
            height: CHART_HEIGHT,
          }}
        >
          {stages.map((s, i) => {
            const ratio = scale(s.pct);
            const px = Math.max(MIN_BAR, Math.round(ratio * CHART_HEIGHT));
            return (
              <div
                key={s.stage}
                className="relative flex h-full flex-col justify-end"
              >
                <div
                  data-bar
                  className="rounded-t-[8px]"
                  style={{
                    height: `${px}px`,
                    background:
                      i < 2
                        ? "linear-gradient(180deg, #2f66ff 0%, #1f57e7 100%)"
                        : "linear-gradient(180deg, #e3e0d6 0%, #d0ccc0 100%)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div
          data-baseline
          className="absolute right-0 bottom-0 left-0 h-px bg-[color:var(--color-line-strong)]"
        />
      </div>

      <div
        className="mt-6 grid gap-4 sm:gap-6 md:gap-10"
        style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
      >
        {stages.map((s, i) => (
          <div key={s.stage} data-label className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-2">
              <span
                className="label-mono-sm"
                style={{ color: i < 2 ? "var(--color-cobalt-deep)" : "var(--color-muted)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium tracking-[-0.02em] text-[color:var(--color-foreground)]">
                {s.stage}
              </span>
            </div>
            <span
              className="text-[24px] font-medium leading-none tracking-[-0.04em] text-[color:var(--color-foreground)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.label}
            </span>
            <span
              className="text-[11px] text-[color:var(--color-muted)]"
              style={{ fontFamily: "var(--font-mono-stack)" }}
            >
              {s.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
