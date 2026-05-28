import { ShieldCheck } from "lucide-react";
import { PageHeader, Badge } from "@/components/ui";
import { policies } from "@/lib/data";

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        kicker="02 / Rule Set"
        title="Simple policies that are easy to explain and test"
        copy="V1 avoids a complicated policy language. Each rule is explicit, inspectable, and mapped directly to the policy engine."
      />
      <section className="grid list-grid">
        {policies.map((policy) => (
          <article className="panel panel-pad stack" key={policy.id}>
            <div className="row">
              <ShieldCheck size={18} strokeWidth={1.7} />
              <Badge value={policy.decision} />
            </div>
            <div>
              <h2>{policy.name}</h2>
              <p className="page-copy">{policy.description}</p>
            </div>
            <div className="row">
              <span className="caption">Condition</span>
              <span>{policy.conditionType}</span>
            </div>
            <div className="row">
              <span className="caption">Severity</span>
              <Badge value={policy.severity} />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
