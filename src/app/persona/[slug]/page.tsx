import { notFound } from "next/navigation";
import { personas } from "@/data/registry";
import { getStarsMap, fetchRepoFile } from "@/lib/github";
import CopyInstallPrompt from "@/components/CopyInstallPrompt";
import ReactMarkdown from "react-markdown";

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

  const [starsMap, readme] = await Promise.all([
    getStarsMap(),
    fetchRepoFile(persona.repository, "README.md"),
  ]);
  const stars = starsMap[persona.slug];

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
            {stars !== undefined && (
              <a
                href={`${persona.repository}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-400 flex items-center gap-1 hover:text-yellow-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                {stars.toLocaleString()}
              </a>
            )}
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
          <CopyInstallPrompt displayName={persona.displayName} repository={persona.repository} />
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Your AI handles the rest: downloading files, personalizing
            the config, and walking you through integrations.
          </p>
          {persona.repository !== "#" && (
            <a
              href={persona.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          )}
        </div>

        {/* README from repo */}
        {readme && (
          <div className="mb-10 border border-[var(--border)] rounded-lg p-6">
            <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
              From the repo
            </h2>
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text-primary)] prose-code:text-[var(--accent)] prose-li:text-[var(--text-secondary)] prose-h1:text-xl prose-h1:mb-3 prose-h2:text-base prose-h2:mb-2 prose-h3:text-sm prose-hr:border-[var(--border)]">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          </div>
        )}

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
            {persona.integrations.length > 0 && (
              <div className="border border-[var(--border)] rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3">Integrations</h3>
                <div className="space-y-2">
                  {persona.integrations.map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-secondary)]">
                          {integration.name}
                        </span>
                        {integration.type && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                            {integration.type}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs ${
                          integration.required
                            ? "text-orange-400"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {integration.required ? "required" : "optional"}
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
                {stars !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Stars</span>
                    <a
                      href={`${persona.repository}/stargazers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                      </svg>
                      {stars.toLocaleString()}
                    </a>
                  </div>
                )}
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
