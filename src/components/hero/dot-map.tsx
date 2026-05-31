"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StarguardMark } from "@/components/brand/logo";
import { Sparkles } from "@/components/motion/sparkles";

/**
 * Interactive hero S-mark. Three motion layers:
 *  - perspective wrapper holds the 3D context
 *  - [data-tilt] gets rotateX / rotateY from cursor position
 *  - [data-ambient] yoyos rotateY between -25 and 25 degrees so the mark
 *    gently turns in 3D space, never edge-on, never mirror-flipped
 *
 * Touch devices keep the ambient rotation but skip cursor bindings.
 */
export function HeroInteractiveMap() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const tilt = root.querySelector<HTMLElement>("[data-tilt]");
      const ambient = root.querySelector<HTMLElement>("[data-ambient]");

      if (ambient) {
        gsap.to(ambient, {
          rotationY: 25,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (matchMedia("(pointer: coarse)").matches) return;

      const onMove = (e: MouseEvent) => {
        const r = root.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);

        if (tilt)
          gsap.to(tilt, {
            rotateX: -y * 9,
            rotateY: x * 12,
            duration: 1.0,
            ease: "power3.out",
            overwrite: "auto",
          });
      };

      const onLeave = () => {
        if (tilt)
          gsap.to(tilt, {
            rotateX: 0,
            rotateY: 0,
            duration: 1.4,
            ease: "power3.out",
          });
      };

      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", onLeave);
      return () => {
        root.removeEventListener("mousemove", onMove);
        root.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none"
      style={{ perspective: 1200 }}
    >
      <div
        data-tilt
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <div
          data-ambient
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="halo" />
          <div className="absolute inset-0 dot-field-muted opacity-60" />
          <div
            className="absolute inset-0 dot-field opacity-90"
            style={{
              WebkitMaskImage: "url(/starguard-mark.svg)",
              maskImage: "url(/starguard-mark.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "78% 78%",
              maskSize: "78% 78%",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <StarguardMark
              style={{ width: "62%", height: "62%", color: "rgba(17, 18, 20, 0.09)" }}
            />
          </div>
          <Sparkles className="z-20" />
        </div>
      </div>
    </div>
  );
}
