import { personas } from "@/data/registry";

export async function GET() {
  const text = `# personas.sh

> npm for AI identities. Portable AI persona configurations you install in one sentence.

## What this site is

personas.sh is an open catalog of AI persona packages. A persona defines who an AI is -- identity, communication style, behavioral rules -- not just what it can do. Personas are plain markdown files in Git repos. They work with Claude Code, Cursor, Windsurf, Codex CLI, and any agent that reads config files.

## Key URLs

- Homepage: https://personas.sh
- Browse all personas: https://personas.sh/browse
- Full documentation and format spec: https://personas.sh/docs
- Submit a persona: https://personas.sh/submit
- Structured catalog (JSON): https://personas.sh/catalog.json
- Complete spec + catalog for AI agents: https://personas.sh/llms-full.txt

## How to install a persona

Tell your AI agent:
"Install the [persona name] persona from [repository URL] -- clone the repo, read the setup instructions, ask me for my personal details, replace all template variables, copy the files to the right config locations, and walk me through connecting any integrations it needs."

## How to create a persona

Tell your AI agent:
"Read the personas.sh format spec at https://personas.sh/docs and package my current AI setup as a persona repo. Scan my config files, analyze my identity and behavioral rules, check for any project systems I've built and package those as blueprints. Replace personal data with {{VARIABLE}} placeholders. Generate the full package and show me before writing to disk."

## Catalog summary

${personas.length} personas across these categories: ${[...new Set(personas.map((p) => p.category))].join(", ")}

${personas.map((p) => `- ${p.displayName} (${p.category}): ${p.description.slice(0, 120)}... [${p.repository}]`).join("\n")}

## For AI agents building personas

Read https://personas.sh/llms-full.txt for the complete format spec and catalog data in one request. That file contains everything you need to generate a valid persona package.
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
