import Link from "next/link";
import type { PersonaEntry } from "@/data/registry";

const categoryColors: Record<string, string> = {
  executive: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "professional-services": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  developer: "bg-green-500/10 text-green-400 border-green-500/20",
  creative: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  research: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "domain-specialist": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  personal: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  operations: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  sales: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  support: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function PersonaCard({ persona }: { persona: PersonaEntry }) {
  const colorClass =
    categoryColors[persona.category] ||
    "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";

  const stats = [
    persona.workflows.length > 0 && `${persona.workflows.length} workflow${persona.workflows.length > 1 ? "s" : ""}`,
    persona.blueprints.length > 0 && `${persona.blueprints.length} blueprint${persona.blueprints.length > 1 ? "s" : ""}`,
    persona.integrations.length > 0 && `${persona.integrations.length} integration${persona.integrations.length > 1 ? "s" : ""}`,
  ].filter(Boolean);

  return (
    <Link href={`/persona/${persona.slug}`}>
      <div className="group border border-[var(--border)] rounded-lg p-6 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {persona.displayName}
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            v{persona.version}
          </span>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 flex-grow leading-relaxed">
          {persona.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${colorClass}`}
          >
            {persona.category}
          </span>
          {stats.map((stat) => (
            <span
              key={stat as string}
              className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
            >
              {stat}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>by {persona.author}</span>
          {persona.featured && (
            <span className="text-[var(--accent)] font-medium">Featured</span>
          )}
        </div>
      </div>
    </Link>
  );
}
