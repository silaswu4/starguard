import type { CSSProperties } from "react";

type Token = { type: string; value: string };

const TS_PATTERNS: { type: string; re: RegExp }[] = [
  { type: "comment", re: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
  { type: "string", re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/ },
  { type: "keyword", re: /\b(?:import|from|const|let|var|function|return|if|else|throw|new|await|async|class|extends|interface|type|export|default|try|catch|for|while)\b/ },
  { type: "builtin", re: /\b(?:Starguard|Promise|Error|Array|Object|Math|JSON|console)\b/ },
  { type: "boolean", re: /\b(?:true|false|null|undefined)\b/ },
  { type: "number", re: /\b\d+(?:\.\d+)?\b/ },
  { type: "punct", re: /[{}()\[\];,:]/ },
];

const REGO_PATTERNS: { type: string; re: RegExp }[] = [
  { type: "comment", re: /#[^\n]*/ },
  { type: "string", re: /"(?:[^"\\]|\\.)*"/ },
  { type: "keyword", re: /\b(?:package|import|default|not|with|as|in|some|every|if|else)\b/ },
  { type: "rule", re: /\b(?:allow|deny|review)\b/ },
  { type: "ident", re: /\b(?:input|output|data|true|false|null)\b/ },
  { type: "number", re: /\b\d+(?:\.\d+)?\b/ },
  { type: "punct", re: /[{}()\[\];,:=<>!&|]/ },
];

const COLORS: Record<string, string> = {
  comment: "rgba(255, 255, 255, 0.35)",
  string: "#9dd6a8",
  keyword: "#7ea8ff",
  builtin: "#c8b5ff",
  boolean: "#ffaf6e",
  number: "#ffaf6e",
  punct: "rgba(255, 255, 255, 0.55)",
  rule: "#7ea8ff",
  ident: "#c8b5ff",
};

function tokenize(code: string, patterns: { type: string; re: RegExp }[]): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    let matched = false;
    for (const p of patterns) {
      const re = new RegExp("^(?:" + p.re.source + ")");
      const m = code.slice(i).match(re);
      if (m && m.index === 0) {
        tokens.push({ type: p.type, value: m[0] });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const next = code[i];
      const last = tokens[tokens.length - 1];
      if (last && last.type === "text") last.value += next;
      else tokens.push({ type: "text", value: next });
      i += 1;
    }
  }
  return tokens;
}

type CodeBlockProps = {
  code: string;
  language: "ts" | "rego";
  filename?: string;
  caption?: string;
  className?: string;
};

export function CodeBlock({ code, language, filename, caption, className }: CodeBlockProps) {
  const patterns = language === "ts" ? TS_PATTERNS : REGO_PATTERNS;
  const tokens = tokenize(code, patterns);
  const wrapperStyle: CSSProperties = {
    fontFamily: "var(--font-mono-stack)",
  };
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-[color:var(--color-charcoal-2)] bg-[color:var(--color-charcoal-2)] p-6 text-[13px] text-white/90 ${className ?? ""}`.trim()}
      style={wrapperStyle}
    >
      {(filename || caption) && (
        <div className="mb-4 flex items-center justify-between text-white/40">
          {filename && <span className="label-mono-sm">{filename}</span>}
          {caption && <span className="label-mono-sm">{caption}</span>}
        </div>
      )}
      <pre className="overflow-x-auto whitespace-pre leading-[1.65]">
        {tokens.map((t, i) => (
          <span key={i} style={COLORS[t.type] ? { color: COLORS[t.type] } : undefined}>
            {t.value}
          </span>
        ))}
      </pre>
    </div>
  );
}
