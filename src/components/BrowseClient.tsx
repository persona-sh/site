"use client";

import { useState } from "react";
import PersonaCard from "@/components/PersonaCard";
import type { PersonaEntry } from "@/data/registry";

interface Category {
  slug: string;
  label: string;
}

export default function BrowseClient({
  personas,
  categories,
  stars,
}: {
  personas: PersonaEntry[];
  categories: Category[];
  stars: Record<string, number>;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [hasWorkflows, setHasWorkflows] = useState(false);
  const [hasBlueprints, setHasBlueprints] = useState(false);

  // Count personas per category for the filter pills
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = cat.slug === "all"
      ? personas.length
      : personas.filter((p) => p.category === cat.slug).length;
    return acc;
  }, {});

  // Only show "All" + categories that have at least one persona
  const visibleCategories = categories.filter(
    (cat) => cat.slug === "all" || categoryCounts[cat.slug] > 0
  );

  const filtered = personas.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      p.displayName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.highlights.some((h) => h.toLowerCase().includes(q)) ||
      p.workflows.some((w) => w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.command.toLowerCase().includes(q)) ||
      p.integrations.some((m) => m.name.toLowerCase().includes(q)) ||
      p.compatibleWith.some((c) => c.toLowerCase().includes(q)) ||
      p.blueprints.some((b) => b.displayName.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.services.some((s) => s.toLowerCase().includes(q))) ||
      p.author.toLowerCase().includes(q);
    const matchesWorkflows = !hasWorkflows || p.workflows.length > 0;
    const matchesBlueprints = !hasBlueprints || p.blueprints.length > 0;
    return matchesCategory && matchesSearch && matchesWorkflows && matchesBlueprints;
  });

  return (
    <div className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Browse Personas</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          {personas.length} personas available
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search personas, blueprints, integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Feature filters */}
        <div className="flex gap-5 mb-5">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasWorkflows}
              onChange={(e) => setHasWorkflows(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span className={hasWorkflows ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
              Has workflows
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasBlueprints}
              onChange={(e) => setHasBlueprints(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span className={hasBlueprints ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
              Has blueprints
            </span>
          </label>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat.slug
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              {cat.label}
              <span className="ml-1 opacity-60">{categoryCounts[cat.slug]}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-muted)]">
            <p className="text-lg mb-2">No personas match your search.</p>
            <p className="text-sm">
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...filtered].sort((a, b) => (stars[b.slug] ?? 0) - (stars[a.slug] ?? 0)).map((persona) => (
              <PersonaCard key={persona.slug} persona={persona} stars={stars[persona.slug]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
