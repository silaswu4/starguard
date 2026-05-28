import { Bot } from "lucide-react";
import { PageHeader, Badge } from "@/components/ui";
import { agents } from "@/lib/data";

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        kicker="01 / Registry"
        title="Known agents with scoped tools and owners"
        copy="Each agent has a purpose, allowed action surface, owner, and baseline risk so policy evaluation starts with context."
      />
      <section className="grid list-grid">
        {agents.map((agent) => (
          <article className="panel panel-pad stack" key={agent.id}>
            <div className="row">
              <Bot size={18} strokeWidth={1.7} />
              <Badge value={agent.riskLevel} />
            </div>
            <div>
              <h2>{agent.name}</h2>
              <p className="page-copy">{agent.description}</p>
            </div>
            <div>
              <span className="caption">Owner</span>
              <p>{agent.ownerName}</p>
            </div>
            <div>
              <span className="caption">Purpose</span>
              <p>{agent.purpose}</p>
            </div>
            <div className="stack">
              <span className="caption">Tools</span>
              <div>
                {agent.allowedTools.map((tool) => (
                  <span className="badge" key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
