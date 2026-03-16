# OpenClaw

## What is it?

A self-hosted, autonomous AI agent that runs on a local machine (laptop, VPS, or Mac Mini) and connects to LLMs (Claude, GPT, DeepSeek). It acts as a wrapper that gives the model access to your file system, terminal, browser, and messaging apps (WhatsApp, Slack, Discord, iMessage).

### What is different?

- Foreground Agent (Traditional): Reactive. Nothing happens unless you type.
- Always-on Agent (OpenClaw): Proactive. It can wake up at 3:00 AM, identify a server issue, fix it, and send you a status report without any human prompt.

Core Primitives for Autonomy:

1. Autonomous Invocation: Wakes up via Cron jobs (hourly checks), Webhooks (e.g., "when I get an email from my boss"), or events.
2. Persistent State: Remembers pending tasks, preferences, and history across "wake-up" cycles.

---

## Architecture

### 1. The Gateway (Orchestrator)

- A _WebSocket server_ running locally.
- Normalizes messages from multiple platforms (WhatsApp, Telegram, etc.) into a unified format.
- Acts as the central message broker.

### 2. Reasoning Layer

- Merges instructions with system state into a "Megaprompt."
- Manages token budgets and selects the appropriate LLM model per session.

### 3. Memory Layer

- The Markdown Hack: Eschews Vector Databases for plain markdown files on disk.
- Virtual Memory Paging Analogy:
- Context Window = RAM (Limited, fast).
- Markdown Files = Disk Storage (Large, persistent).
- Compact Command = Paging. When the window is full, it summarizes, runs a Write Ahead Log (WAL) to persist important data, and then clears the window.

### 4. Execution Layer (Skills)

- Executes shell commands, Python scripts, and API calls.
- ClawHub: A marketplace of 10,000+ community-contributed "Skills" defined in English markdown.

### Session & Process Isolation

- Each channel (e.g., WhatsApp vs. Discord) is an Isolated Session to prevent context leaking.
- Background tasks run in Docker containers, mirroring process isolation in modern OS design.

---

## Security & Risks

- Malicious Marketplace: ~20% (800+) of skills on ClawHub were found to be malware, specifically targeting macOS credentials.
- WebSocket Hijacking: Early versions didn't validate origin headers, allowing a website's JavaScript to steal the Gateway auth token in milliseconds. [[06:12](http://www.youtube.com/watch?v=Hv84JhzKvKQ&t=372)]
- Sensitive Files: Attackers target three specific files:

1. `openclaw.json`: Gateway Auth tokens.
2. `device.json`: Cryptographic pairing keys.
3. `soul.md`: The file defining the agent's personality and rules; modifying this can change the agent's behavior covertly.

## Best Practices (Severity)

- Rootless Execution: Use Podman instead of Docker. Podman is rootless; if an attacker escapes the container, they don't have root access to your host machine.
- Network Security:
- Bind the gateway to localhost only (never expose port `18789` to the internet).
- If remote access is needed, use a Reverse Proxy with TLS and strong Auth.

- Sandboxing: Utilize OpenClaw’s two-layer isolation: Gateway in one container, and the Execution Layer in a separate sandbox with no network access and a read-only filesystem.
- Vetting: Run `openclaw doctor` to check for risky policies and always read the source code of community skills before installation.
