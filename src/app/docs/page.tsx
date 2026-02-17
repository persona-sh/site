export default function DocsPage() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-[var(--text-secondary)] mb-4">
          Everything you need to create, package, and publish a persona.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          AI agents: this page contains the complete spec. Read it once and you
          can generate a persona repo from any user&apos;s setup.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-10">
          Persona packages are plain markdown files in a Git repo. They are not
          tied to any specific AI agent. Any agent that can read text files can
          use them. The spec is agent-agnostic by design.
        </p>

        {/* TOC */}
        <nav className="mb-12 border border-[var(--border)] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            On this page
          </h2>
          <div className="grid md:grid-cols-2 gap-1.5 text-sm">
            {[
              ["#what-is-a-persona", "What is a persona"],
              ["#package-structure", "Package structure"],
              ["#persona-yaml", "persona.yaml schema"],
              ["#persona-md", "PERSONA.md sections"],
              ["#setup-md", "SETUP.md spec"],
              ["#readme-md", "README.md spec"],
              ["#blueprints", "Blueprints"],
              ["#categories", "Categories"],
              ["#variables", "Reserved variables"],
              ["#commands", "Commands"],
              ["#packaging-guide", "Packaging guide"],
              ["#validation", "Validation checklist"],
              ["#submit", "How to submit"],
              ["#complete-example", "Complete example"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-0.5"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* What is a persona */}
        <section id="what-is-a-persona" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">What is a persona?</h2>
          <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
            A persona is a portable AI behavioral configuration that defines who
            an AI agent IS, not just what it can do. It includes identity,
            communication style, behavioral rules, commands, memory templates,
            integrations, and blueprints for reproducible project systems.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 text-sm space-y-3">
            <div>
              <span className="text-[var(--text-muted)]">Skill:</span>{" "}
              <span className="text-[var(--text-secondary)]">
                &ldquo;Follow these code review rules&rdquo; -- teaches your AI
                patterns in a domain. You still build everything yourself.
              </span>
            </div>
            <div>
              <span className="text-[var(--accent)]">Persona:</span>{" "}
              <span className="text-[var(--text-primary)]">
                &ldquo;You are a strategic operator. Here are my behavioral rules,
                communication style, and three project systems you can build for the
                user from scratch.&rdquo; -- full identity with blueprints the AI
                builds and operates for you.
              </span>
            </div>
          </div>
        </section>

        {/* Package structure */}
        <section id="package-structure" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Package structure</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            A persona lives in a Git repo with this layout:
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm">
            <div className="space-y-1">
              <div>
                <span className="text-[var(--text-primary)]">my-persona/</span>
              </div>
              {[
                [true, "persona.yaml", "machine-readable metadata"],
                [true, "PERSONA.md", "identity, behavior, communication style"],
                [true, "SETUP.md", "dependencies and installation steps"],
                [true, "README.md", "description for humans"],
                [false, "commands/", "slash command definitions"],
                [false, "memory/", "persistent state templates"],
                [false, "skills/", "custom domain knowledge written by the author"],
                [false, "examples/", "sample interactions"],
                [false, "blueprints/", "reproducible project systems"],
              ].map(([req, name, desc]) => (
                <div key={name as string} className="ml-4">
                  <span
                    className={
                      req
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)]"
                    }
                  >
                    {name as string}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {" "}
                    -- {desc as string}{" "}
                    {req ? "(required)" : "(optional)"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PERSONA.md */}
        <section id="persona-md" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">PERSONA.md</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            The identity document. Gets loaded into the AI&apos;s context every
            session. Three sections are required.
          </p>
          <div className="space-y-3">
            {[
              {
                name: "## Identity",
                req: true,
                desc: 'Who this persona IS. Role, primary directive, relationship to the user. 3-10 sentences in second person ("You are...").',
              },
              {
                name: "## Communication Style",
                req: true,
                desc: "How the persona talks. Tone, formatting, vocabulary, specific DO and DON'T rules. Minimum 3 concrete instructions.",
              },
              {
                name: "## Behavioral Rules",
                req: true,
                desc: "Hard constraints and NEVER/ALWAYS rules. Confidentiality, authorization boundaries, uncertainty handling. Minimum 2 rules.",
              },
              {
                name: "## Context",
                req: false,
                desc: "Company details, team structure, industry, key systems. Use {{VARIABLES}} for personal data.",
              },
              {
                name: "## Operating Modes",
                req: false,
                desc: "Named behavioral modes (triage, drafting, research). Each mode has an activation trigger and specific rules.",
              },
              {
                name: "## Integrations",
                req: false,
                desc: "MCP server routing, tool preferences, and fallback behavior when integrations are disconnected.",
              },
            ].map((section) => (
              <div
                key={section.name}
                className="border border-[var(--border)] rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{section.name}</h3>
                  {section.req && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--accent-dim)] text-[var(--accent)]">
                      required
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SETUP.md */}
        <section id="setup-md" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">SETUP.md</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Installation instructions. Must work for both AI-assisted and manual setup.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`# Setup

## Quick Install (AI-assisted)

Paste into your AI agent:

\`\`\`
Install the [Display Name] persona from
github.com/you/my-persona -- clone the repo,
read the setup instructions, ask me for my
personal details, replace all template variables,
copy the files to the right config locations,
and walk me through connecting any integrations.
\`\`\`

## Manual Installation

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/you/my-persona.git
\`\`\`

### 2. Edit PERSONA.md
Replace all {{VARIABLE}} placeholders with your info.

### 3. Load the persona into your AI agent
Copy PERSONA.md content into your agent's config.
Every agent has a location for persistent instructions:

Known config paths (examples, not exhaustive):
- Claude Code: ~/.claude/CLAUDE.md
- Cursor: .cursorrules in project root
- Windsurf: .windsurfrules in project root
- OpenClaw/ZeroClaw: personality config dir

For any other agent: find where it reads system
instructions or persistent context, and paste
PERSONA.md there. The format is plain markdown --
it works anywhere.

### 4. Connect integrations (if applicable)
[List each MCP server or API with setup steps]

### 5. Test it works
[Provide a test prompt the user can run to verify]`}
            </pre>
          </div>
          <div className="mt-3 text-sm text-[var(--text-muted)]">
            <p>Both paths must be present. The AI-assisted path is the one-sentence install prompt. The manual path numbers every step.</p>
          </div>
        </section>

        {/* README.md */}
        <section id="readme-md" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">README.md</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Human-readable description. This is what people see on GitHub before installing.
          </p>
          <div className="space-y-3">
            {[
              {
                name: "What This Is",
                req: true,
                desc: "1-2 paragraphs. What the persona does, who it's for, what makes it different from a generic AI.",
              },
              {
                name: "What It Does",
                req: true,
                desc: "Bullet list of key behaviors and capabilities. Pull from your highlights.",
              },
              {
                name: "Install",
                req: true,
                desc: "The one-sentence AI install prompt. Same as the quick install in SETUP.md.",
              },
              {
                name: "Blueprints",
                req: false,
                desc: "Table of included project systems: name, complexity, what it builds. Only if your persona has blueprints.",
              },
              {
                name: "Compatible With",
                req: true,
                desc: "List of AI agents this works with (Claude Code, Cursor, Windsurf, etc.).",
              },
            ].map((section) => (
              <div
                key={section.name}
                className="border border-[var(--border)] rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{section.name}</h3>
                  {section.req && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--accent-dim)] text-[var(--accent)]">
                      required
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* persona.yaml */}
        <section id="persona-yaml" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">persona.yaml</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Machine-readable metadata. This is what the catalog indexes.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`name: my-persona          # lowercase, hyphens, 3-40 chars
display_name: My Persona   # human-readable
version: 1.0.0             # semver
description: >
  What it does, who it's for. 1-3 sentences.

author:
  name: Your Name
  github: your-username

category: executive         # see categories below
tags: [tag1, tag2, tag3]    # 2-8 tags

compatible_with:            # agents you've tested with
  - Claude Code             # list what you've verified
  - Cursor                  # not an exhaustive limit
  - OpenClaw                # any agent that reads
  - ZeroClaw                # markdown config files works

integrations:               # optional, external services
  - name: gmail
    type: mcp               # mcp, api, service, plugin
    required: true
    purpose: "Email triage"
  - name: notion
    type: api
    required: false
    purpose: "Knowledge base"

required_skills:            # optional, third-party skills
  - name: xlsx
    install: "npx skills add xlsx"
    purpose: "Spreadsheet creation and editing"
    required: true

variables:                  # optional
  - key: YOUR_NAME
    prompt: "What's your name?"
    required: true

workflows:                  # optional, slash commands
  - command: /gm
    name: Morning Briefing
    description: "Pulls calendar, tasks, inbox"
  - command: /triage
    name: Inbox Triage
    description: "Scans and classifies messages"

blueprints:                 # optional
  - telegram-intake         # names of dirs in blueprints/
  - accounting-pipeline

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
  - "What makes this persona distinct, bullet 1"
  - "What makes this persona distinct, bullet 2"
  - "What makes this persona distinct, bullet 3"

repository: https://github.com/you/my-persona`}
            </pre>
          </div>
          <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <p><strong className="text-[var(--text-primary)]">Required fields:</strong> name, display_name, version, description, author (name + github), category, tags</p>
            <p><strong className="text-[var(--text-primary)]">Recommended:</strong> compatible_with, highlights, repository, variables</p>
            <p><strong className="text-[var(--text-primary)]">Optional:</strong> integrations, required_skills, workflows, blueprints, delegates_to, modes</p>
            <p className="text-[var(--text-muted)] mt-2 text-xs">
              <strong>Note on compatible_with:</strong> Persona packages are plain markdown files. They work with ANY AI agent that reads config files. The compatible_with field lists agents the author has tested with, not agents it&apos;s limited to. If an agent isn&apos;t listed, the persona still works -- the author just hasn&apos;t verified it.
            </p>
          </div>
        </section>

        {/* Blueprints */}
        <section id="blueprints" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Blueprints</h2>
          <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
            Blueprints are reproducible project systems bundled in the persona
            repo. A command tells the AI what to do in a conversation. A
            blueprint gives the AI the complete architecture for a system it
            builds once and then operates.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Examples: a Telegram bot that files documents to Google Drive, an
            accounting pipeline with a custom spreadsheet, a multi-workflow
            automation suite, a partnership tracking system.
          </p>

          <h3 className="text-sm font-semibold mb-3">Blueprint structure</h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm mb-6">
            <div className="space-y-1">
              <div>
                <span className="text-[var(--text-primary)]">
                  blueprints/telegram-intake/
                </span>
              </div>
              {[
                ["blueprint.yaml", "metadata, prerequisites, outcomes"],
                ["README.md", "what it builds and who it's for"],
                ["setup.md", "step-by-step build instructions"],
                ["workflows/", "n8n JSON, Zapier configs, automation files"],
                ["templates/", "spreadsheet templates, folder structures"],
              ].map(([name, desc]) => (
                <div key={name} className="ml-4">
                  <span className="text-[var(--accent)]">{name}</span>
                  <span className="text-[var(--text-muted)]">
                    {" "}
                    -- {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-sm font-semibold mb-3">blueprint.yaml</h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed mb-6">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`name: telegram-intake
display_name: Telegram Document Intake
version: 1.0.0
description: >
  Telegram bot that receives documents, classifies
  them with AI, and files them to Google Drive.
complexity: complex    # simple | medium | complex

requires:
  services:
    - name: n8n
      purpose: "Workflow automation engine"
      required: true
    - name: telegram-bot
      purpose: "Telegram Bot API token"
      required: true
    - name: google-drive
      purpose: "File storage destination"
      required: true

outcomes:
  - "Documents sent to Telegram are auto-classified and filed"
  - "Every document logged in a tracking spreadsheet"
  - "AI renames files with standardized naming"

setup_time_minutes: 30

variables:
  - key: TELEGRAM_BOT_TOKEN
    prompt: "Paste your Telegram bot token"
    description: "Create via @BotFather. Looks like 123456:ABC-DEF..."
    required: true
  - key: DRIVE_ROOT_FOLDER_ID
    prompt: "Google Drive folder ID for filing"
    description: "AI creates subfolders inside this. Copy ID from Drive URL."
    create: false
  - key: TRACKING_SHEET_ID
    prompt: "Google Sheet ID for the tracking log"
    description: "Leave blank -- AI creates this during setup."
    create: true`}
            </pre>
          </div>

          <h3 className="text-sm font-semibold mb-3">Key rules</h3>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              "setup.md must number every step and mark which need human action (OAuth clicks, token creation) vs. which the AI handles",
              "Strip ALL credentials from workflow files. Use {{VARIABLE}} placeholders",
              "Include expected outputs after key steps so users know it's working",
              "Templates should contain example data, not be empty shells",
              "Every variable needs a description: what valid values look like, where to find them, and whether the AI creates the resource or the user provides one",
              "If the blueprint needs a folder structure, spreadsheet schema, or database schema, document it in templates/ as a separate file. The installing AI needs to know 'create these 4 folders' or 'create a sheet with these columns' -- not just 'put an ID here'",
              "Workflow files should be functional templates. Someone's AI should read setup.md, create the infrastructure, substitute variables, and have a working system without reverse-engineering intent",
              "Be honest about complexity and setup time",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[var(--accent)] mt-0.5 shrink-0">~</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Every persona gets exactly one category. Pick the best fit.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ["executive", "C-suite support, leadership, strategy, chief of staff"],
              ["professional-services", "Consulting, compliance, HR, advisory"],
              ["developer", "Code review, DevOps, architecture, language-specific"],
              ["creative", "Writing, content, design, brand, voice cloning"],
              ["research", "Academic, market research, competitive analysis"],
              ["domain-specialist", "Industry-specific expertise (pharma, real estate, etc.)"],
              ["personal", "Life coaching, accountability, journaling, personal growth"],
              ["operations", "Project management, workflows, automation"],
              ["education", "Tutoring, language learning, curriculum design, study coaching"],
              ["finance", "Trading, investing, accounting, budgeting, financial analysis"],
              ["health", "Fitness coaching, nutrition, therapy, wellness, biohacking"],
              ["legal", "Contract review, compliance, regulatory analysis"],
              ["sales", "CRM, pipeline, outreach, proposals, deal closing"],
              ["support", "Customer service, documentation, ticket triage"],
            ].map(([slug, desc]) => (
              <div
                key={slug}
                className="border border-[var(--border)] rounded-lg p-3"
              >
                <span className="font-mono text-[var(--accent)]">{slug}</span>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Variables */}
        <section id="variables" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Reserved variables</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Use {"{{VARIABLE}}"} placeholders for personal data. These have
            standard meanings across all personas.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium">
                    Variable
                  </th>
                  <th className="text-left p-3 text-[var(--text-muted)] font-medium">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["YOUR_NAME", "Full name"],
                  ["YOUR_FIRST_NAME", "First name"],
                  ["YOUR_ROLE", "Job title"],
                  ["YOUR_COMPANY", "Company name"],
                  ["YOUR_EMAIL", "Primary email"],
                  ["YOUR_TIMEZONE", "IANA timezone"],
                  ["YOUR_CURRENCY", "ISO currency code"],
                  ["YOUR_LANGUAGE", "Primary language"],
                ].map(([key, val]) => (
                  <tr
                    key={key}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="p-3 font-mono text-[var(--accent)] text-xs">
                      {`{{${key}}}`}
                    </td>
                    <td className="p-3">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Commands */}
        <section id="commands" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Commands</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Slash commands live in <code className="text-[var(--accent)]">commands/</code>.
            Each file is one command. The filename becomes the command name.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`# commands/gm.md
---
name: gm
description: Morning briefing
---

# /gm - Good Morning Briefing

## Step 1: Email Triage
1. Fetch unread emails from last 12 hours
2. Classify into Tier 1 (urgent), Tier 2, Tier 3
3. Draft responses for Tier 1

## Step 2: Calendar Review
1. Fetch today's events
2. Flag back-to-back meetings

## Output Format
EMAIL: [count] unread. [count] urgent.
CALENDAR: [count] meetings today.
GOALS: Top goal status + suggested action.`}
            </pre>
          </div>
        </section>

        {/* Packaging Guide */}
        <section id="packaging-guide" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            How to create a persona
          </h2>
          <p className="text-[var(--text-secondary)] mb-2">
            If you&apos;ve customized your AI&apos;s behavior, you already have
            a persona. Here&apos;s how to package it.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Open your AI agent, paste the prompt below, and let it do the work.
          </p>

          <div className="bg-[var(--bg-secondary)] border-2 border-[var(--accent)] rounded-lg p-6 mb-6">
            <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              Copy this prompt and paste it into your AI agent
            </h3>
            <div className="text-sm text-[var(--text-primary)] leading-relaxed space-y-4">
              <p>
                Read the personas.sh format spec at{" "}
                <span className="text-[var(--accent)]">
                  personas.sh/docs
                </span>{" "}
                and package my current AI setup as a persona repo. Follow these
                steps:
              </p>
              <p>
                1. Scan my full agent setup and report what you find. Check
                ALL of these: config files (CLAUDE.md, .cursorrules,
                .windsurfrules, commands/, settings.json, YAML state files),
                MCP server configs (.claude.json, .cursor/mcp.json),
                installed skills/plugins (.agents/skills/, any third-party
                skill directories), memory/state files (.claude/projects/*/memory/),
                and any hooks or middleware scripts.
              </p>
              <p>
                2. Analyze the config: identity, communication rules,
                constraints, integrations, commands, persistent state, domain
                knowledge.
              </p>
              <p>
                3. Inventory installed skills and MCP servers. For third-party
                skills (installed via npm/pip/etc), list them as required_skills
                with install commands. For custom domain knowledge I wrote
                myself, include the content in skills/. For MCP servers, list
                them as integrations with type: mcp.
              </p>
              <p>
                4. Check for project systems I&apos;ve built (automations, bots,
                tracking spreadsheets, workflows). Package each as a blueprint
                with setup.md, workflow files, and templates.
              </p>
              <p>
                5. De-identify everything. Replace all personal data with{" "}
                {"{{VARIABLE}}"} placeholders. Strip API keys, credentials,
                tokens, and absolute paths. CRITICAL: also scrub workflow
                files and automation configs. Replace hardcoded user IDs,
                bot tokens, Google Drive folder IDs, spreadsheet IDs, webhook
                URLs, company names, team member names, and any
                organization-specific logic with descriptive placeholders
                (YOUR_SHEET_ID, YOUR_FOLDER_ID, YOUR_BOT_TOKEN, YOUR_COMPANY,
                etc.). The exported workflows should be functional templates,
                not mirrors of your production setup.
              </p>
              <p>
                6. Generate the full package: persona.yaml, PERSONA.md (with
                Identity, Communication Style, Behavioral Rules sections),
                SETUP.md, README.md, commands/, skills/, blueprints/ if
                applicable.
              </p>
              <p>
                7. Show me the file structure and key files for review before
                writing to disk.
              </p>
              <p>
                8. After I approve, audit the final output. Read every
                generated file and verify: does the Identity section actually
                capture how I use my AI, or is it generic filler? Do the
                Behavioral Rules reflect my real constraints, or did you
                invent ones I never set? Are the Communication Style rules
                specific patterns from my config, not vague best practices
                you added? Does every blueprint match a real system I built,
                not something you assumed? Flag anything you&apos;re unsure
                about and ask me rather than guessing.
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Your AI will scan your setup, strip personal info, and generate a
            package that follows the spec. Review it, then push to GitHub and
            submit.
          </p>

          <div className="border border-[var(--border)] rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">
              What makes a good persona
            </h3>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              {[
                [
                  "Specific over general.",
                  '"You are a legal analyst specializing in UAE free zone regulations" beats "You are a helpful legal expert."',
                ],
                [
                  "Rules over vibes.",
                  '"Never use more than 8 words in an email subject line" beats "Keep subject lines concise."',
                ],
                [
                  "Examples matter.",
                  "A persona with 5 sample interactions outperforms one with 50 behavioral rules.",
                ],
                [
                  "Blueprints are the differentiator.",
                  "Anyone can write personality rules. Bundling your actual project systems is what makes people install yours.",
                ],
                [
                  "Degrade gracefully.",
                  "If an MCP server is missing, note it and continue. Don't break.",
                ],
              ].map(([bold, rest], i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[var(--accent)] mt-0.5 shrink-0">
                    ~
                  </span>
                  <span>
                    <strong className="text-[var(--text-primary)]">
                      {bold}
                    </strong>{" "}
                    {rest}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Validation Checklist */}
        <section id="validation" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Validation checklist</h2>
          <p className="text-[var(--text-secondary)] mb-2">
            AI agents: run through this list before presenting the package to the user.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Every item must pass. If something fails, fix it before proceeding.
          </p>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Structure</h3>
              <div className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {[
                  "persona.yaml exists with all required fields (name, display_name, version, description, author, category, tags)",
                  "PERSONA.md has ## Identity, ## Communication Style, ## Behavioral Rules sections",
                  "SETUP.md exists with both AI-assisted and manual install paths",
                  "README.md exists with What This Is, What It Does, Install, Compatible With sections",
                  "category is one of the valid slugs listed in Categories above",
                  "tags is an array of 2-8 lowercase hyphenated strings",
                  "version follows semver (e.g., 1.0.0)",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] shrink-0">[]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">De-identification</h3>
              <div className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {[
                  "No real names, emails, phone numbers, or addresses in any file",
                  "No API keys, tokens, credentials, or secrets",
                  "No absolute file paths (e.g., /Users/john/...)",
                  "No hardcoded Google Drive folder IDs, spreadsheet IDs, or webhook URLs",
                  "No Telegram user IDs, bot tokens, or chat IDs",
                  "No company-specific logic that reveals the author's organization",
                  "All personal data replaced with {{VARIABLE}} placeholders",
                  "Workflow/automation files use YOUR_SHEET_ID, YOUR_FOLDER_ID, YOUR_BOT_TOKEN style placeholders",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] shrink-0">[]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Completeness</h3>
              <div className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {[
                  "If the user has installed skills or plugins, they are listed in required_skills with install commands",
                  "If the user has MCP servers configured, they are listed in integrations with type: mcp",
                  "If the user has custom domain knowledge files, they are included in skills/",
                  "If the user has memory/state patterns, templates are included in memory/",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] shrink-0">[]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Quality</h3>
              <div className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                {[
                  "PERSONA.md Identity section is specific, not generic ('legal analyst specializing in UAE free zones' not 'helpful legal expert')",
                  "Communication Style has at least 3 concrete rules, not vibes",
                  "Behavioral Rules has at least 2 NEVER or ALWAYS constraints",
                  "highlights array has 3-9 entries describing what makes this persona distinct",
                  "description is 1-3 sentences that would make someone want to install it",
                  "If blueprints exist: each has blueprint.yaml, README.md, and setup.md with numbered steps",
                  "If workflows exist: each has command (starting with /), name, and description",
                  "If required_skills exist: each has name, install command, and purpose",
                  "If delegates_to exist: each has persona (slug or repo URL) and purpose",
                  "If modes exist: each has name, trigger (channel or command), and description",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] shrink-0">[]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Submit */}
        <section id="submit" className="mb-12">
          <h2 className="text-xl font-semibold mb-4">How to submit</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Once your persona repo is on GitHub, submit it to the catalog.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-[var(--accent)] shrink-0 font-mono">
                1.
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                Push your persona package to a public GitHub repo. If you need
                help, tell your AI: &ldquo;Create a GitHub repo called
                my-persona and push this folder to it.&rdquo;
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-[var(--accent)] shrink-0 font-mono">
                2.
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                Go to the{" "}
                <a
                  href="/submit"
                  className="text-[var(--accent)] hover:underline"
                >
                  submit page
                </a>{" "}
                and paste your repo URL.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-[var(--accent)] shrink-0 font-mono">
                3.
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                Your persona will appear in the catalog.
              </span>
            </div>
          </div>
        </section>

        {/* Full example */}
        <section id="complete-example" className="mb-12 border-t border-[var(--border)] pt-10">
          <h2 className="text-xl font-semibold mb-4">Complete example</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            All 4 required files for a minimal persona package, plus a blueprint.
            Copy this structure as a starting point.
          </p>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 mt-6">
            persona.yaml
          </h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed mb-6">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`name: sales-closer
display_name: Sales Closer
version: 1.0.0
description: >
  Pipeline management and deal execution for B2B
  sales teams. Tracks prospects, drafts follow-ups,
  and scores deals by close probability.
author:
  name: Jane Smith
  github: janesmith
category: sales
tags: [sales, b2b, pipeline, deal-closing, crm]
compatible_with:
  - Claude Code
  - Cursor
integrations:
  - name: gmail
    type: mcp
    required: true
    purpose: "Prospect communication"
  - name: google-sheets
    type: mcp
    required: false
    purpose: "Pipeline tracking"
required_skills:
  - name: xlsx
    install: "npx skills add xlsx"
    purpose: "Create and edit pipeline spreadsheets"
    required: true
variables:
  - key: YOUR_NAME
    prompt: "Your full name?"
    required: true
  - key: YOUR_COMPANY
    prompt: "Company name?"
    required: true
workflows:
  - command: /pipeline
    name: Pipeline Review
    description: "Scans all deals, flags stale ones, suggests next actions"
blueprints:
  - deal-tracker
highlights:
  - "Flags any deal with no activity in 14+ days. No deals go cold silently."
  - "Drafts follow-up emails in your voice, not a template. Ready to send."
  - "Scores every deal by close probability based on activity and timeline."
  - "Pipeline spreadsheet auto-created with status tracking and reminders."
repository: https://github.com/janesmith/sales-closer`}
            </pre>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            PERSONA.md
          </h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed mb-6">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`## Identity

You are the Sales Closer for {{YOUR_NAME}} at
{{YOUR_COMPANY}}. Your job is to move deals through
the pipeline and close them. You track every prospect,
draft follow-up emails in the user's voice, and flag
deals that are going cold. You are a partner in the
sales process, not a reporting tool.

## Communication Style

- Direct and numbers-driven. Lead with metrics.
- No fluff. "Deal X is 60% likely to close by March"
  not "Deal X is looking promising."
- Match the user's tone in prospect communications.
- When presenting pipeline: table format, sorted by
  close probability descending.

## Behavioral Rules

- NEVER send an email to a prospect without approval.
- NEVER share pipeline data outside the conversation.
- Flag any deal with no activity in 14+ days.
- When a deal is at risk, say so directly. Don't hedge.

## Context

- Company: {{YOUR_COMPANY}}
- Industry: {{YOUR_INDUSTRY}}
- Average deal cycle: {{YOUR_DEAL_CYCLE}} days

## Integrations

- Gmail: prospect email drafting and tracking
- Google Sheets: pipeline spreadsheet
- If Gmail is not connected, draft emails as text blocks
  and note they need manual sending.`}
            </pre>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            SETUP.md
          </h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed mb-6">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`# Setup

## Quick Install

Paste into your AI agent:

\`\`\`
Install the Sales Closer persona from
github.com/janesmith/sales-closer -- clone the repo,
read the setup instructions, ask me for my personal
details, replace all template variables, copy the
files to the right config locations, and walk me
through connecting any integrations it needs.
\`\`\`

## Manual Installation

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/janesmith/sales-closer.git
cd sales-closer
\`\`\`

### 2. Edit PERSONA.md
Replace these placeholders with your info:
| Variable | Replace with |
|---|---|
| {{YOUR_NAME}} | Your full name |
| {{YOUR_COMPANY}} | Your company name |
| {{YOUR_INDUSTRY}} | Your industry |
| {{YOUR_DEAL_CYCLE}} | Average deal length in days |

### 3. Copy to your AI config
- Claude Code: copy PERSONA.md content into ~/.claude/CLAUDE.md
- Cursor: copy into .cursorrules in your project root

### 4. Connect Gmail (optional)
Set up the Gmail MCP server for email drafting.
Without it, the persona still works but drafts
emails as text blocks instead of sending directly.

### 5. Test it works
Try: "Review my pipeline and flag anything stale."
You should get a structured table of deals with
status and recommended next actions.`}
            </pre>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            README.md
          </h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed mb-6">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`# Sales Closer

AI persona for B2B pipeline management and deal
execution. Tracks every prospect, drafts follow-ups
in your voice, flags stale deals, and scores close
probability.

## What It Does

- Flags deals with no activity in 14+ days
- Drafts follow-up emails ready to send
- Scores deals by close probability
- Creates pipeline spreadsheet with tracking
- Reviews pipeline on command with /pipeline

## Install

Paste into Claude Code, Cursor, or any AI agent:

\`\`\`
Install the Sales Closer persona from
github.com/janesmith/sales-closer
\`\`\`

## Blueprints

| Name | Complexity | What it builds |
|---|---|---|
| Deal Tracker | Simple | Pipeline spreadsheet with reminders |

## Compatible With

- Claude Code
- Cursor

For manual setup, see [SETUP.md](SETUP.md).`}
            </pre>
          </div>

          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            blueprints/deal-tracker/blueprint.yaml
          </h3>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 font-mono text-sm leading-relaxed">
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">
              {`name: deal-tracker
display_name: Deal Tracking Pipeline
version: 1.0.0
description: >
  Google Sheets pipeline tracker with automated
  follow-up reminders and close probability scoring.
complexity: simple
requires:
  services:
    - name: google-sheets
      purpose: "Pipeline spreadsheet"
      required: true
outcomes:
  - "All deals tracked in one sheet with status and probability"
  - "Automated reminders when deals go cold"
setup_time_minutes: 10
variables:
  - key: PIPELINE_SHEET_ID
    prompt: "Google Sheet ID for deal tracking"
    description: "AI creates this for you during setup. Leave blank."
    create: true
    required: false`}
            </pre>
          </div>
        </section>

        {/* Spec repo link */}
        <section className="text-center text-sm text-[var(--text-muted)]">
          <p>
            Full technical spec, packaging guide, and classifier prompt:{" "}
            <a
              href="https://github.com/persona-sh/spec"
              className="text-[var(--accent)] hover:underline"
            >
              github.com/persona-sh/spec
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
