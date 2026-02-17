import { notFound } from "next/navigation";
import { personas } from "@/data/registry";

// Generate static paths for all personas
export function generateStaticParams() {
  return personas.map((p) => ({ slug: p.slug }));
}

const categoryLabels: Record<string, string> = {
  executive: "Executive",
  "professional-services": "Professional Services",
  developer: "Developer",
  creative: "Creative",
  research: "Research",
  "domain-specialist": "Domain Specialist",
  personal: "Personal",
  operations: "Operations",
  education: "Education",
  finance: "Finance",
  health: "Health",
  legal: "Legal",
  sales: "Sales",
  support: "Support",
};

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = personas.find((p) => p.slug === slug);

  if (!persona) {
    notFound();
  }

  return (
    <div className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">
              {categoryLabels[persona.category] || persona.category}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              v{persona.version}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3">{persona.displayName}</h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {persona.description}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            by{" "}
            <a
              href={`https://github.com/${persona.authorGithub}`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              {persona.author}
            </a>
          </p>
        </div>

        {/* Install prompt */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            How to install
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Open any AI agent and paste this:
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-6 py-4 text-sm">
            <span className="text-[var(--text-primary)]">
              Install the {persona.displayName} persona from{" "}
              <span className="text-[var(--accent)]">{persona.repository}</span>
              {" "}&ndash; clone the repo, read the setup instructions, ask me for
              my personal details, replace all template variables, copy the
              files to the right config locations, and walk me through
              connecting any integrations it needs.
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Your AI handles the rest: downloading files, personalizing
            the config, and walking you through integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* What it does — highlights */}
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                What it does
              </h2>
              <div className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                {persona.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] mt-0.5 shrink-0">~</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Built-in commands */}
            {persona.workflows.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Slash commands
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Run these in your AI session. The persona executes them using connected integrations.
                </p>
                <div className="space-y-4">
                  {persona.workflows.map((wf) => (
                    <div
                      key={wf.command}
                      className="border border-[var(--border)] rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <code className="text-[var(--accent)] text-sm font-mono">
                          {wf.command}
                        </code>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {wf.name}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {wf.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blueprints */}
            {persona.blueprints.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Projects you can build
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Complete systems this persona can set up for you. Each includes
                  workflow configs, templates, and step-by-step instructions.
                </p>
                <div className="space-y-4">
                  {persona.blueprints.map((bp) => (
                    <div
                      key={bp.name}
                      className="border border-[var(--border)] rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {bp.displayName}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            bp.complexity === "complex"
                              ? "border-orange-400/30 text-orange-400"
                              : bp.complexity === "medium"
                                ? "border-yellow-400/30 text-yellow-400"
                                : "border-green-400/30 text-green-400"
                          }`}
                        >
                          {bp.complexity}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
                        {bp.description}
                      </p>
                      <div className="space-y-1.5">
                        {bp.outcomes.map((outcome, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--text-muted)]"
                          >
                            <span className="text-[var(--accent)] mt-0.5 shrink-0">
                              +
                            </span>
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--border)]">
                        {bp.services.map((svc) => (
                          <span
                            key={svc}
                            className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {persona.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Source */}
            {persona.repository !== "#" && (
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Source
                </h2>
                <a
                  href={persona.repository}
                  className="text-sm text-[var(--accent)] hover:underline"
                >
                  {persona.repository}
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Integrations */}
            {persona.mcpServers.length > 0 && (
              <div className="border border-[var(--border)] rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3">MCP Integrations</h3>
                <div className="space-y-2">
                  {persona.mcpServers.map((mcp) => (
                    <div
                      key={mcp.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[var(--text-secondary)]">
                        {mcp.name}
                      </span>
                      <span
                        className={`text-xs ${
                          mcp.required
                            ? "text-orange-400"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {mcp.required ? "required" : "optional"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blueprint services */}
            {persona.blueprints.length > 0 && (() => {
              const allServices = [...new Set(
                persona.blueprints.flatMap((bp) => bp.services)
              )].sort();
              return allServices.length > 0 ? (
                <div className="border border-[var(--border)] rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-3">Blueprint Services</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-2">
                    Used by the project blueprints below
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {allServices.map((svc) => (
                      <span
                        key={svc}
                        className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Compatibility */}
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Works With</h3>
              <div className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {persona.compatibleWith.map((tool) => (
                  <div key={tool}>{tool}</div>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">License</span>
                  <span className="text-[var(--text-secondary)]">MIT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Version</span>
                  <span className="text-[var(--text-secondary)] font-mono">
                    {persona.version}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Category</span>
                  <span className="text-[var(--text-secondary)]">
                    {categoryLabels[persona.category] || persona.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
