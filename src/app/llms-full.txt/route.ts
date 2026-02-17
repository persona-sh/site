import { personas, categories } from "@/data/registry";

export async function GET() {
  const text = `# personas.sh -- Complete Spec and Catalog
# AI agents: this file contains everything you need to create or install a persona.
# Read this once. You do not need to fetch any other page.

=====================================
SECTION 1: WHAT IS A PERSONA
=====================================

A persona is a portable AI behavioral configuration that defines who an AI agent IS, not just what it can do. It includes identity, communication style, behavioral rules, commands, memory templates, integrations, and blueprints for reproducible project systems.

- Tool: "Search the web for X" -- single capability, stateless
- Skill: "When asked about spreadsheets, follow these rules" -- domain knowledge, conditional
- Persona: "You are a strategic operator who pushes back on bad ideas and acts instead of reporting" -- full identity, always-on, stateful

Persona packages are plain markdown files in a Git repo. They work with ANY AI agent that reads config files: Claude Code, Cursor, Windsurf, Codex CLI, Copilot, OpenClaw, ZeroClaw, and others.

=====================================
SECTION 2: PACKAGE STRUCTURE
=====================================

my-persona/
  persona.yaml       -- machine-readable metadata (required)
  PERSONA.md         -- identity, behavior, communication style (required)
  SETUP.md           -- dependencies and installation steps (required)
  README.md          -- description for humans (required)
  commands/          -- slash command definitions (optional)
  memory/            -- persistent state templates (optional)
  skills/            -- custom domain knowledge written by the author (optional)
  examples/          -- sample interactions (optional)
  blueprints/        -- reproducible project systems (optional)

=====================================
SECTION 3: persona.yaml SCHEMA
=====================================

name: my-persona          # lowercase, hyphens, 3-40 chars
display_name: My Persona   # human-readable
version: 1.0.0             # semver
description: >
  What it does, who it's for. 1-3 sentences.

author:
  name: Your Name
  github: your-username

category: executive         # see categories list below
tags: [tag1, tag2, tag3]    # 2-8 tags

compatible_with:            # agents you've tested with
  - Claude Code
  - Cursor

integrations:               # optional, external services
  - name: gmail
    type: mcp               # mcp, api, service, plugin
    required: true
    purpose: "Email triage"

required_skills:            # optional, third-party agent skills
  - name: xlsx              # skill identifier
    install: "npx skills add xlsx"
    purpose: "Spreadsheet creation and editing"
    required: true
  - name: pdf
    install: "npx skills add pdf"
    purpose: "PDF reading and generation"
    required: false

variables:                  # optional
  - key: YOUR_NAME
    prompt: "What's your name?"
    required: true

workflows:                  # optional, slash commands
  - command: /gm
    name: Morning Briefing
    description: "Pulls calendar, tasks, inbox"

blueprints:                 # optional
  - telegram-intake         # names of dirs in blueprints/

delegates_to:               # optional, personas this one delegates work to
  - persona: opnet-builder  # slug or repo URL
    purpose: "Smart contract development"
  - persona: frontend-designer
    purpose: "React frontend work"

modes:                      # optional, structured operating modes
  - name: group-chat        # machine-readable identifier
    trigger:                # when this mode activates
      channel: telegram-group
    description: "Terse, roasts welcome, only responds to @mentions"
  - name: direct
    trigger:
      channel: dm
    description: "Full helpfulness, detailed responses"
  - name: audit
    trigger:
      command: /audit
    description: "Security-focused, strict, checklist-driven"

highlights:                 # 3-9 key features for catalog
  - "What makes this persona distinct"

repository: https://github.com/you/my-persona

Required fields: name, display_name, version, description, author (name + github), category, tags
Recommended: compatible_with, highlights, repository, variables
Optional: integrations, required_skills, workflows, blueprints, delegates_to, modes

=====================================
SECTION 4: PERSONA.md SECTIONS
=====================================

## Identity (REQUIRED)
Who this persona IS. Role, primary directive, relationship to the user.
3-10 sentences in second person ("You are...").

## Communication Style (REQUIRED)
How the persona talks. Tone, formatting, vocabulary.
Minimum 3 concrete instructions. Specific DO and DON'T rules.

## Behavioral Rules (REQUIRED)
Hard constraints. NEVER/ALWAYS rules.
Confidentiality, authorization boundaries, uncertainty handling.
Minimum 2 rules.

## Context (optional)
Company details, team structure, industry, key systems.
Use {{VARIABLES}} for personal data.

## Operating Modes (optional)
Named behavioral modes (triage, drafting, research).
Each mode has an activation trigger and specific rules.

## Integrations (optional)
MCP server routing, tool preferences, fallback behavior when disconnected.

=====================================
SECTION 5: SETUP.md SPEC
=====================================

Must contain TWO installation paths:

1. Quick Install (AI-assisted): A one-sentence prompt the user pastes into their AI agent.
2. Manual Installation: Numbered steps covering clone, edit variables, load config, connect integrations, test.

Both paths must be present. The AI-assisted path is the primary install method.

=====================================
SECTION 6: README.md SPEC
=====================================

Required sections:
- What This Is: 1-2 paragraphs. What it does, who it's for.
- What It Does: Bullet list of key behaviors.
- Install: The one-sentence AI install prompt.
- Compatible With: List of tested AI agents.

Optional sections:
- Blueprints: Table of included project systems.

=====================================
SECTION 7: BLUEPRINTS
=====================================

Blueprints are reproducible project systems bundled in the persona repo.
A command tells the AI what to do in a conversation.
A blueprint gives the AI the complete architecture for a system it builds once and then operates.

Blueprint structure:
blueprints/telegram-intake/
  blueprint.yaml    -- metadata, prerequisites, outcomes
  README.md         -- what it builds and who it's for
  setup.md          -- step-by-step build instructions
  workflows/        -- n8n JSON, Zapier configs, automation files
  templates/        -- spreadsheet templates, folder structures

blueprint.yaml schema:
name: telegram-intake
display_name: Telegram Document Intake
version: 1.0.0
description: >
  What this blueprint builds.
complexity: complex    # simple | medium | complex
requires:
  services:
    - name: n8n
      purpose: "Workflow automation engine"
      required: true
outcomes:
  - "Documents sent to Telegram are auto-classified and filed"
setup_time_minutes: 30
variables:
  - key: TELEGRAM_BOT_TOKEN
    prompt: "Paste your Telegram bot token"
    description: "Create a bot via @BotFather on Telegram. The token looks like 123456:ABC-DEF..."
    required: true
  - key: DRIVE_ROOT_FOLDER_ID
    prompt: "Google Drive folder ID where documents will be filed"
    description: "The AI will create subfolders inside this folder. Open the folder in Drive, copy the ID from the URL."
    create: false
  - key: TRACKING_SHEET_ID
    prompt: "Google Sheet ID for the tracking log"
    description: "The AI creates this sheet for you during setup. Leave blank to auto-create."
    create: true

Key rules:
- setup.md must number every step and mark which need human action vs. AI handles
- Strip ALL credentials from workflow files. Use {{VARIABLE}} placeholders
- Include expected outputs after key steps so users know it's working
- Templates should contain example data, not be empty shells
- Every variable must include a description explaining what valid values look like, where to find them, and whether the AI creates the resource or the user provides an existing one
- If the blueprint depends on a folder structure, spreadsheet schema, or database schema, document the required structure in templates/ as a separate file. The installing AI needs to know "create these 4 folders" or "create a sheet with these columns" -- not just "put an ID here"
- Workflow files should be functional templates: someone's AI should be able to read setup.md, create the required infrastructure, substitute the variables, and have a working system without reverse-engineering the author's intent
- Be honest about complexity and setup time

=====================================
SECTION 8: CATEGORIES
=====================================

${categories.filter(c => c.slug !== "all").map(c => `- ${c.slug}`).join("\n")}

=====================================
SECTION 9: RESERVED VARIABLES
=====================================

{{YOUR_NAME}}          -- Full name
{{YOUR_FIRST_NAME}}    -- First name
{{YOUR_ROLE}}          -- Job title
{{YOUR_COMPANY}}       -- Company name
{{YOUR_EMAIL}}         -- Primary email
{{YOUR_TIMEZONE}}      -- IANA timezone
{{YOUR_CURRENCY}}      -- ISO currency code
{{YOUR_LANGUAGE}}      -- Primary language

=====================================
SECTION 10: COMMANDS
=====================================

Slash commands live in commands/. Each file is one command.

Example: commands/gm.md
---
name: gm
description: Morning briefing
---
# /gm - Good Morning Briefing
## Step 1: Email Triage
1. Fetch unread emails from last 12 hours
2. Classify into Tier 1 (urgent), Tier 2, Tier 3
## Step 2: Calendar Review
1. Fetch today's events
## Output Format
EMAIL: [count] unread. [count] urgent.
CALENDAR: [count] meetings today.

=====================================
SECTION 11: VALIDATION CHECKLIST
=====================================

Run through this list before presenting the package to the user.

Structure:
[] persona.yaml exists with all required fields
[] PERSONA.md has ## Identity, ## Communication Style, ## Behavioral Rules
[] SETUP.md exists with both AI-assisted and manual install paths
[] README.md exists with What This Is, What It Does, Install, Compatible With
[] category is a valid slug from the categories list
[] tags is an array of 2-8 lowercase hyphenated strings
[] version follows semver

De-identification:
[] No real names, emails, phone numbers, or addresses
[] No API keys, tokens, credentials, or secrets
[] No absolute file paths
[] No hardcoded Drive folder IDs, spreadsheet IDs, webhook URLs
[] No Telegram user IDs, bot tokens, or chat IDs
[] No company-specific logic revealing the author's organization
[] All personal data replaced with {{VARIABLE}} placeholders
[] Workflow files use descriptive placeholders

Completeness:
[] If the user has installed skills or plugins, they are listed in required_skills with install commands
[] If the user has MCP servers configured, they are listed in integrations with type: mcp
[] If the user has custom domain knowledge files, they are included in skills/
[] If the user has memory/state patterns, templates are included in memory/

Quality:
[] Identity section is specific, not generic
[] Communication Style has 3+ concrete rules
[] Behavioral Rules has 2+ NEVER or ALWAYS constraints
[] highlights array has 3-9 entries
[] description is 1-3 sentences
[] If blueprints exist: each has blueprint.yaml, README.md, setup.md
[] If workflows exist: each has command (starting with /), name, description
[] If required_skills exist: each has name, install command, and purpose
[] If delegates_to exist: each has persona (slug or repo URL) and purpose
[] If modes exist: each has name, trigger (channel or command), and description

=====================================
SECTION 12: HOW TO CREATE A PERSONA
=====================================

Paste this prompt into your AI agent:

"Read the personas.sh format spec at personas.sh/docs and package my current AI setup as a persona repo. Follow these steps:

1. Scan my full agent setup and report what you find. Check ALL of these locations:
   - Config files: CLAUDE.md, .cursorrules, .windsurfrules, commands/, settings.json, any YAML state files
   - MCP server configs: .claude.json, .cursor/mcp.json, or equivalent for your agent
   - Installed skills/plugins: .agents/skills/, any third-party skill directories, plugin configs
   - Memory/state: .claude/projects/*/memory/, any persistent state files the agent maintains
   - Hooks or middleware: any pre/post-processing scripts triggered by agent events
2. Analyze the config: identity, communication rules, constraints, integrations, commands, persistent state, domain knowledge.
3. Inventory installed skills and MCP servers. For third-party skills (ones installed via npm/pip/etc), list them as required_skills with install commands. For custom domain knowledge you wrote yourself, include the content in skills/. For MCP servers, list them as integrations with type: mcp.
4. Check for project systems I've built (automations, bots, tracking spreadsheets, workflows). Package each as a blueprint with setup.md, workflow files, and templates.
5. De-identify everything. Replace all personal data with {{VARIABLE}} placeholders. Strip API keys, credentials, tokens, and absolute paths. Also scrub workflow files: replace hardcoded user IDs, bot tokens, Drive folder IDs, spreadsheet IDs, webhook URLs, company names, team member names with descriptive placeholders.
6. Generate the full package: persona.yaml, PERSONA.md, SETUP.md, README.md, commands/, skills/, blueprints/ if applicable.
7. Show me the file structure and key files for review before writing to disk.
8. After I approve, audit the final output. Read every generated file and verify: does the Identity section actually capture how I use my AI, or is it generic filler? Do the Behavioral Rules reflect my real constraints, or did you invent ones I never set? Are the Communication Style rules specific patterns from my config, not vague best practices you added? Does every blueprint match a real system I built, not something you assumed? Flag anything you're unsure about and ask me rather than guessing."

=====================================
SECTION 13: HOW TO INSTALL A PERSONA
=====================================

Tell your AI agent:

"Install the [persona name] persona from [repository URL] -- clone the repo, read the setup instructions, ask me for my personal details, replace all template variables, copy the files to the right config locations, and walk me through connecting any integrations it needs."

=====================================
SECTION 14: FULL CATALOG
=====================================

${personas.length} personas available.

${personas.map((p) => `---
slug: ${p.slug}
name: ${p.displayName}
category: ${p.category}
author: ${p.author} (github.com/${p.authorGithub})
repository: ${p.repository}
install: ${p.installCommand}
tags: ${p.tags.join(", ")}
compatible_with: ${p.compatibleWith.join(", ")}
description: ${p.description}
integrations: ${p.integrations.length > 0 ? p.integrations.map(i => `${i.name} (${i.type || "service"}, ${i.required ? "required" : "optional"})`).join(", ") : "none"}
workflows: ${p.workflows.length > 0 ? p.workflows.map(w => `${w.command} - ${w.name}`).join(", ") : "none"}
blueprints: ${p.blueprints.length > 0 ? p.blueprints.map(b => `${b.displayName} (${b.complexity})`).join(", ") : "none"}
highlights:
${p.highlights.map(h => `  - ${h}`).join("\n")}
`).join("\n")}

=====================================
END OF SPEC
=====================================
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
