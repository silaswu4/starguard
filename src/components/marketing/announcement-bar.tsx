import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="border-b border-[color:var(--color-line)] bg-[color:var(--color-background-soft)]">
      <div className="container-page flex h-9 items-center justify-center gap-2 text-[12.5px] text-[color:var(--color-foreground-soft)]">
        <span
          className="rounded-full bg-[color:var(--color-icy-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-cobalt-deep)]"
          style={{ fontFamily: "var(--font-mono-stack)" }}
        >
          Early access
        </span>
        <Link href="/pricing" className="inline-flex items-center gap-1 transition-colors hover:text-[color:var(--color-foreground)]">
          Starguard is open to design partners. Get in touch
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
