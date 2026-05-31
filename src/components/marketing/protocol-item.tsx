"use client";

import { useEffect, useRef, useState } from "react";

type ProtocolItemProps = {
  name: string;
  slug?: string;
};

const cursor = { x: -1, y: -1 };
let cursorWired = false;

function ensureCursorWired() {
  if (typeof window === "undefined" || cursorWired) return;
  cursorWired = true;
  const onMove = (e: PointerEvent) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
}

export function ProtocolItem({ name, slug }: ProtocolItemProps) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureCursorWired();
  }, []);

  useEffect(() => {
    if (!hovered) return;
    let raf = 0;
    const tick = () => {
      const el = rowRef.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const at = document.elementFromPoint(cursor.x, cursor.y);
      if (!at || !el.contains(at)) {
        setHovered(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      style={{ minHeight: 84 }}
    >
      <div
        ref={rowRef}
        className="flex h-12 items-center justify-center"
        onPointerEnter={() => setHovered(true)}
      >
        {slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://api.iconify.design/simple-icons:${slug}.svg?color=%235a5c62`}
            alt={name}
            className="h-12 w-auto"
            style={{
              maxWidth: 220,
              opacity: hovered ? 1 : 0.85,
              transition: "opacity 300ms ease",
            }}
          />
        ) : (
          <span
            className="whitespace-nowrap text-[24px] font-medium tracking-[-0.025em] text-[color:var(--color-foreground-soft)]"
            style={{
              fontFamily: "var(--font-sans)",
              opacity: hovered ? 1 : 0.75,
              transition: "opacity 300ms ease",
            }}
          >
            {name}
          </span>
        )}
      </div>
      <span
        className="label-mono pointer-events-none whitespace-nowrap text-[color:var(--color-foreground)]"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        {name}
      </span>
    </div>
  );
}
