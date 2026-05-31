import type { CSSProperties } from "react";

type MarkProps = {
  className?: string;
  style?: CSSProperties;
};

export function StarguardMark({ className, style }: MarkProps) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/starguard-mark.svg)",
        maskImage: "url(/starguard-mark.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}

type LogoProps = {
  inverse?: boolean;
  className?: string;
  markSize?: number;
};

export function Logo({ inverse = false, className, markSize = 28 }: LogoProps) {
  const colorClass = inverse ? "text-white" : "text-[color:var(--color-foreground)]";
  return (
    <span className={`inline-flex items-center gap-[10px] ${colorClass} ${className ?? ""}`.trim()}>
      <StarguardMark style={{ width: markSize, height: markSize }} />
      <span
        className="font-bold leading-none tracking-[-0.045em]"
        style={{
          fontSize: Math.round(markSize * 0.86),
          fontFamily: "var(--font-display)",
        }}
      >
        Starguard
      </span>
    </span>
  );
}
