// Persona registry - the catalog source of truth.
// Each entry maps to a persona package in a GitHub repo.
// To add a persona: open a PR adding your entry here.

export interface Workflow {
  command: string;
  name: string;
  description: string;
}

export interface Blueprint {
  name: string;
  displayName: string;
  description: string;
  complexity: "simple" | "medium" | "complex";
  services: string[];
  outcomes: string[];
}

export interface PersonaEntry {
  slug: string;
  displayName: string;
  description: string;
  author: string;
  authorGithub: string;
  category: string;
  tags: string[];
  mcpServers: { name: string; required: boolean }[];
  compatibleWith: string[];
  workflows: Workflow[];
  blueprints: Blueprint[];
  highlights: string[];
  version: string;
  repository: string;
  installCommand: string;
  featured: boolean;
}

export const personas: PersonaEntry[] = [
  {
    slug: "operator-copilot",
    displayName: "Operator Copilot",
    description:
      "AI partner for non-developer business operators who think in systems. Configured for direct communication, anti-sycophancy, and action over reporting.",
    author: "Justin",
    authorGithub: "adbcjay",
    category: "executive",
    tags: ["operator", "coo", "non-developer", "anti-sycophancy", "business-automation", "strategic"],
    mcpServers: [
      { name: "google-drive", required: false },
      { name: "n8n", required: false },
    ],
    compatibleWith: ["Claude Code", "Cursor", "Windsurf", "Codex CLI", "Copilot"],
    workflows: [],
    blueprints: [
      {
        name: "telegram-intake",
        displayName: "Telegram Document Intake",
        description: "Telegram bot that receives documents and photos, classifies them with AI, renames them, and files them to the correct Google Drive folder. Tracks everything in a Google Sheet.",
        complexity: "complex",
        services: ["n8n", "telegram", "google-drive", "google-sheets", "anthropic-api"],
        outcomes: [
          "Documents sent to Telegram are automatically classified and filed to Drive",
          "AI renames files with standardized naming conventions",
          "Every filed document is logged in a tracking spreadsheet with status, classification, and links",
          "Handles photos, PDFs, and text messages",
        ],
      },
      {
        name: "task-management",
        displayName: "AI Task Management",
        description: "Telegram-triggered task management where the AI tracks, prioritizes, and executes tasks across projects. Integrates with Google Sheets for persistent tracking.",
        complexity: "medium",
        services: ["n8n", "telegram", "google-sheets"],
        outcomes: [
          "Create, update, and query tasks via Telegram messages",
          "AI prioritizes tasks based on project goals and deadlines",
          "Persistent task tracking in Google Sheets with status and timestamps",
        ],
      },
      {
        name: "accounting-pipeline",
        displayName: "Accounting Pipeline",
        description: "Custom accounting spreadsheet that categorizes expenses and revenue, linked to Google Drive folders for source documents. AI classifies transactions from uploaded receipts and invoices.",
        complexity: "medium",
        services: ["google-sheets", "google-drive", "anthropic-api"],
        outcomes: [
          "Expenses and revenue automatically categorized from uploaded documents",
          "Custom spreadsheet with formulas for running totals and category breakdowns",
          "Source documents linked to their corresponding spreadsheet entries",
        ],
      },
    ],
    highlights: [
      "Partnership, not service — pushes back on bad ideas, disagrees when it sees a problem, offers unsolicited opinions. Silent agreement is treated as failure.",
      "Anti-sycophancy engine — no \"Great question!\", no hedging. If your idea has holes, says \"That won't work because X\" directly.",
      "No-code-first evaluation — evaluates n8n, Zapier, or Make before writing custom code. Has been used to build 8-workflow automation pipelines without a single line of code.",
      "Act, don't report — fixes broken things instead of presenting findings. Built and deployed a Telegram bot, orchestrated multi-drive file migrations, and shipped a full website in single sessions.",
      "De-GPT all writing — external-facing text scores <=2 on AI detection. No emdashes, no formulaic structure, no \"Here's...\" openers. Reads like a human wrote it.",
      "Persistent memory system — records decisions, corrections, and project state across sessions. After any mistake, writes what it learned so it never repeats it.",
      "Skill-aware execution — auto-invokes spreadsheet, PDF, Word, and presentation tools. Findings lead to action via the right tool, never stopping at findings alone.",
      "Calibrated for non-developers — explains logic in plain language. \"Non-developer\" means doesn't write code, not non-technical. Built for operators who think in systems, not syntax.",
      "Statements over questions — leads with its best assessment. Picks one approach and explains why. Holds position under challenge unless new information changes the calculus.",
    ],
    version: "1.0.0",
    repository: "https://github.com/adbcjay/operator-copilot",
    installCommand: "git clone https://github.com/adbcjay/operator-copilot.git",
    featured: true,
  },
  {
    slug: "chief-of-staff",
    displayName: "Chief of Staff",
    description:
      "Executive assistant that triages email, manages your calendar, runs morning briefings, and tracks quarterly goals. Built by the CEO of Ada.",
    author: "Mike Murchison",
    authorGithub: "mimurchison",
    category: "executive",
    tags: ["executive", "email", "calendar", "briefings", "productivity", "crm"],
    mcpServers: [
      { name: "gmail", required: true },
      { name: "google-calendar", required: true },
      { name: "slack", required: false },
      { name: "whatsapp", required: false },
      { name: "imessage", required: false },
      { name: "granola", required: false },
    ],
    compatibleWith: ["Claude Code"],
    workflows: [
      {
        command: "/gm",
        name: "Morning Briefing",
        description: "Pulls today's calendar, overdue tasks, goal progress, and urgent inbox items into one structured briefing. Ends with a focus recommendation for the day.",
      },
      {
        command: "/triage",
        name: "Inbox Triage",
        description: "Scans all connected channels (email, Slack, WhatsApp), classifies every item into 3 urgency tiers, drafts responses in your voice, and waits for approval before sending anything.",
      },
      {
        command: "/my-tasks",
        name: "Task Management",
        description: "Goal-aligned task tracking where the AI actually executes tasks (drafts the email, does the research), not just reminds you. Flags overdue items and celebrates early completions.",
      },
      {
        command: "/enrich",
        name: "Contact Enrichment",
        description: "Auto-builds a personal CRM by scanning your communications. Tracks interaction history, flags stale relationships by tier, suggests outreach with context.",
      },
    ],
    blueprints: [],
    highlights: [
      "Morning briefing replaces 90 minutes of inbox processing with 5 minutes",
      "3-tier triage system prioritizes by who matters, not who's loudest",
      "Personal CRM that builds itself — 160+ contacts tracked, auto-enriched across all channels",
      "Every decision filtered through your quarterly goals — calendar, triage, task priority",
      "Drafts are send-ready in your voice, not starting points for editing",
      "Staleness alerts when important relationships go quiet",
      "Never sends any message without explicit approval",
    ],
    version: "1.0.0",
    repository: "https://github.com/mimurchison/claude-chief-of-staff",
    installCommand: "git clone https://github.com/mimurchison/claude-chief-of-staff.git",
    featured: true,
  },
  {
    slug: "personal-ai-infrastructure",
    displayName: "Personal AI Infrastructure",
    description:
      "Complete personal AI operating system with the TELOS identity framework. Six-layer architecture covering identity, preferences, workflows, skills, hooks, and memory. Your AI becomes a persistent coach that learns from every interaction.",
    author: "Daniel Miessler",
    authorGithub: "danielmiessler",
    category: "executive",
    tags: ["identity-framework", "life-os", "executive", "coaching", "memory", "telos"],
    mcpServers: [],
    compatibleWith: ["Claude Code"],
    workflows: [],
    blueprints: [],
    highlights: [
      "TELOS framework structures identity across 10 markdown files (Mission, Goals, Projects, Beliefs, Models, Strategies, Narratives, Learned, Challenges, Ideas) with cross-referencing IDs.",
      "Six-layer architecture: Identity, Preferences, Workflows, Skills, Hooks, Memory. Each layer builds on the one below it.",
      "Relational graph across identity documents. Goal G1 connects to Challenge C1 and Strategy S1. The AI traverses relationships, not just reads files.",
      "Built by the creator of Fabric (30k+ stars). Battle-tested across security research, content creation, and personal productivity.",
      "Memory system learns from interaction signals. Not just what you say, but patterns in how you work.",
      "8,600+ stars. The most mature personal AI infrastructure project on GitHub.",
    ],
    version: "1.0.0",
    repository: "https://github.com/danielmiessler/Personal_AI_Infrastructure",
    installCommand: "git clone https://github.com/danielmiessler/Personal_AI_Infrastructure.git",
    featured: false,
  },
  {
    slug: "rust-enforcer",
    displayName: "Rust Enforcer",
    description:
      "Opinionated Rust development persona that mandates specific crates, enforces zero .unwrap() in library code, bans React for frontends, and applies a $100 penalty framing for suboptimal code. Built the miditui TUI app entirely with AI.",
    author: "Max Woolf",
    authorGithub: "minimaxir",
    category: "developer",
    tags: ["rust", "opinionated", "enforcer", "strict", "language-specific", "coding-standards"],
    mcpServers: [],
    compatibleWith: ["Claude Code", "Cursor"],
    workflows: [],
    blueprints: [],
    highlights: [
      "Prescribes exactly which crates to use: polars, axum, ratatui, tokio. Not guidelines. Requirements.",
      "Zero .unwrap() in library code. Proper error handling enforced everywhere.",
      "$100 fine penalty framing for suboptimal patterns. Known prompt engineering technique for increasing compliance.",
      "Bans JavaScript for computation in web apps. Frontend must be Pico CSS + vanilla JS. No React.",
      "4-space indentation, 100-char line limits, env vars via .env, no credential logging. The rules are the point.",
      "Used to build miditui (Rust TUI MIDI player) entirely with Claude Opus. Proof that opinionated constraints produce better code.",
    ],
    version: "1.0.0",
    repository: "https://gist.github.com/minimaxir/23ee55a83633ac0b6b92de635291ad80",
    installCommand: "Download the CLAUDE.md gist and place it in your project root.",
    featured: false,
  },
  {
    slug: "soul-md",
    displayName: "SOUL.md",
    description:
      "Framework for building AI personas that think and speak as you, not about you. Four structured files capture your worldview, voice patterns, operating instructions, and a self-construction interview workflow.",
    author: "Aaron Mars",
    authorGithub: "aaronjmars",
    category: "creative",
    tags: ["personal-brand", "voice-clone", "identity", "writing", "self-construction", "worldview"],
    mcpServers: [],
    compatibleWith: ["Claude Code", "Cursor", "Windsurf"],
    workflows: [],
    blueprints: [],
    highlights: [
      "Four-file split: SOUL.md (identity/worldview), STYLE.md (voice patterns), SKILL.md (operating instructions), BUILD.md (self-construction guide).",
      "Tensions & Contradictions section forces the persona to be human rather than artificially consistent. Acknowledges internal conflicts.",
      "BUILD.md is an interview workflow. An AI agent reads it, interviews you, and constructs your soul file. The persona builds itself.",
      "Vocabulary section with personalized definitions. Not what words mean in general, but what they mean to you.",
      "Opinions organized by domain. The AI doesn't just know your style, it knows your positions.",
      "Influences section tracks people, books, and concepts that shaped your thinking, with specific lessons from each.",
    ],
    version: "1.0.0",
    repository: "https://github.com/aaronjmars/soul.md",
    installCommand: "git clone https://github.com/aaronjmars/soul.md.git",
    featured: false,
  },
];

export const categories = [
  { slug: "all", label: "All" },
  { slug: "executive", label: "Executive" },
  { slug: "professional-services", label: "Professional Services" },
  { slug: "developer", label: "Developer" },
  { slug: "creative", label: "Creative" },
  { slug: "research", label: "Research" },
  { slug: "domain-specialist", label: "Domain Specialist" },
  { slug: "personal", label: "Personal" },
  { slug: "operations", label: "Operations" },
  { slug: "sales", label: "Sales" },
  { slug: "support", label: "Support" },
];
