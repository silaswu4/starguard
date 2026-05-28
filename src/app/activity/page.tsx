"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAgentGate } from "@/components/agentgate-provider";
import { PageHeader, agentName, formatDate } from "@/components/ui";

export default function ActivityPage() {
  const { logs } = useAgentGate();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return logs;
    return logs.filter((log) =>
      [log.eventType, log.message, agentName(log.agentId), JSON.stringify(log.metadata)]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [logs, query]);

  return (
    <>
      <PageHeader
        kicker="05 / Audit Trail"
        title="Chronological evidence for every action"
        copy="The audit log is the proof layer: what the agent proposed, which policy fired, what the human decided, and what was blocked."
      />
      <section className="panel panel-pad stack">
        <label className="row">
          <span className="caption"><Search size={16} /> Search audit</span>
          <input
            className="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try blocked, refund, sales, approved"
          />
        </label>
        <div className="timeline">
          {filtered.map((log) => (
            <div className="timeline-item" key={log.id}>
              <span className="caption">{formatDate(log.createdAt)}</span>
              <div>
                <div className="row">
                  <strong>{log.eventType.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</strong>
                  <span className="caption">{agentName(log.agentId)}</span>
                </div>
                <p>{log.message}</p>
                <pre className="payload">{JSON.stringify(log.metadata, null, 2)}</pre>
              </div>
            </div>
          ))}
          {filtered.length === 0 ? <div className="empty">No audit events match that search.</div> : null}
        </div>
      </section>
    </>
  );
}
