"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!repoUrl.trim()) return;
    // Open GitHub issue with pre-filled body
    const title = encodeURIComponent(
      `New persona: ${repoUrl.split("/").pop() || "submission"}`
    );
    const body = encodeURIComponent(`**Repo:** ${repoUrl.trim()}\n\n---\n_Submitted via persona.sh_`);
    window.open(
      `https://github.com/persona-sh/site/issues/new?title=${title}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <div className="px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submit a Persona</h1>
        <p className="text-[var(--text-secondary)] mb-10">
          Share your AI configuration with the community. Three steps.
        </p>

        {/* Step 1: Create */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[var(--accent)] font-mono text-lg font-bold">
              01
            </span>
            <h2 className="text-lg font-semibold">Create your persona</h2>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mb-4 ml-9">
            Open your AI agent and paste this prompt. It will read your config,
            strip personal info, and generate a persona package.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-5 py-4 ml-9 text-sm">
            <p className="text-[var(--text-primary)] leading-relaxed">
              Read the persona.sh format spec at{" "}
              <span className="text-[var(--accent)]">
                persona.sh/docs
              </span>{" "}
              and package my current AI setup as a persona repo. Scan my config
              files, analyze my identity and behavioral rules, check for any
              project systems I&apos;ve built (automations, bots, spreadsheets)
              and package those as blueprints. Replace personal data with{" "}
              {"{{VARIABLE}}"} placeholders. Generate the full package and show
              me before writing to disk.
            </p>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2 ml-9">
            See the{" "}
            <a href="/docs#packaging-guide" className="text-[var(--accent)] hover:underline">
              full packaging guide
            </a>{" "}
            for details.
          </p>
        </div>

        {/* Step 2: Push */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[var(--accent)] font-mono text-lg font-bold">
              02
            </span>
            <h2 className="text-lg font-semibold">Push to GitHub</h2>
          </div>
          <p className="text-[var(--text-secondary)] text-sm ml-9 mb-3">
            Tell your AI to create a public GitHub repo and push the files:
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-5 py-4 ml-9 text-sm">
            <p className="text-[var(--text-primary)]">
              Create a public GitHub repo called my-persona and push this
              package to it.
            </p>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2 ml-9">
            Or drag the folder into{" "}
            <a
              href="https://github.com/new"
              className="text-[var(--accent)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/new
            </a>{" "}
            if you prefer.
          </p>
        </div>

        {/* Step 3: Submit */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[var(--accent)] font-mono text-lg font-bold">
              03
            </span>
            <h2 className="text-lg font-semibold">Submit your repo</h2>
          </div>
          <p className="text-[var(--text-secondary)] text-sm ml-9 mb-4">
            Paste your GitHub repo URL below.
          </p>
          <div className="ml-9">
            {submitted ? (
              <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-5 text-sm">
                <p className="text-green-400 font-semibold mb-1">Submitted</p>
                <p className="text-[var(--text-secondary)]">
                  A GitHub issue was opened. Your persona will be added to the
                  catalog shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="https://github.com/you/your-persona"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!repoUrl.trim()}
                  className="px-5 py-2 bg-[var(--accent)] text-black text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Submit persona
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Review checklist */}
        <section className="border-t border-[var(--border)] pt-10">
          <h2 className="text-lg font-semibold mb-4">
            Before you submit
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Quick check. Your AI should have handled most of this, but verify:
          </p>
          <div className="space-y-2 text-sm">
            {[
              "persona.yaml exists with name, display_name, version, description, author, category, tags",
              "PERSONA.md has ## Identity, ## Communication Style, ## Behavioral Rules",
              "SETUP.md exists with installation instructions",
              "README.md describes what the persona does",
              "No real names, emails, or API keys (should be {{VARIABLES}} or stripped)",
              "No absolute file paths",
              "Blueprints have setup.md with numbered steps (if applicable)",
            ].map((check, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-[var(--text-secondary)]"
              >
                <span className="w-4 h-4 mt-0.5 rounded border border-[var(--border)] shrink-0"></span>
                <span>{check}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
