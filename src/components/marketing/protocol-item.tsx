type ProtocolItemProps = {
  name: string;
  slug?: string;
};

export function ProtocolItem({ name, slug }: ProtocolItemProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      style={{ minHeight: 84 }}
    >
      <div className="flex h-12 items-center justify-center">
        {slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://api.iconify.design/simple-icons:${slug}.svg?color=%235a5c62`}
            alt={name}
            className="h-12 w-auto opacity-85"
            style={{ maxWidth: 220 }}
          />
        ) : (
          <span
            className="whitespace-nowrap text-[24px] font-medium tracking-[-0.025em] text-[color:var(--color-foreground-soft)] opacity-75"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {name}
          </span>
        )}
      </div>
      <span className="label-mono whitespace-nowrap text-[color:var(--color-muted)]">
        {name}
      </span>
    </div>
  );
}
