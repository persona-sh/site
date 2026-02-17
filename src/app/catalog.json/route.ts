import { personas, categories } from "@/data/registry";

export const dynamic = "force-static";

export async function GET() {
  const catalog = {
    version: "1.0",
    generated: new Date().toISOString(),
    description:
      "personalities.sh persona catalog. AI agents: fetch this URL to search all available personas.",
    search_tips:
      "Search by: name, description, tags, category, integrations (mcpServers), workflows, highlights, or compatibleWith.",
    install_instructions:
      "To install any persona, paste into your AI agent: 'Install the [displayName] persona from [repository] — clone the repo, read the setup instructions, ask me for my personal details, replace all template variables, copy the files to the right config locations, and walk me through connecting any integrations it needs.'",
    count: personas.length,
    categories: categories.filter((c) => c.slug !== "all").map((c) => c.slug),
    personas,
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
