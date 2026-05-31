"use client";

import { useEffect, useId, useRef, useState } from "react";

type SparklineProps = {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  className?: string;
};

/**
 * Tiny inline SVG line chart. Animates its stroke-dashoffset on enter view.
 */
export function Sparkline({
  values,
  width = 96,
  height = 28,
  color = "var(--color-cobalt)",
  fill = "rgba(47, 102, 255, 0.08)",
  className,
}: SparklineProps) {
  const id = useId();
  const ref = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = width / Math.max(values.length - 1, 1);
  const pts = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / span) * (height - 6) - 3;
      return [x, y] as const;
    });

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  useEffect(() => {
    if (ref.current) setLength(ref.current.getTotalLength());
  }, [line]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !length) return;
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    const fillEl = fillRef.current;
    if (fillEl) {
      fillEl.style.opacity = "0";
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.strokeDashoffset = "0";
            if (fillEl) {
              fillEl.style.transition = "opacity 1.4s ease 0.3s";
              fillEl.style.opacity = "1";
            }
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [length]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <path ref={fillRef} d={area} fill={fill} id={`${id}-fill`} />
      <path
        ref={ref}
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
