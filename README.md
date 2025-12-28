# LILIA - Ethical AI-Powered VS Code Extension

<div align="center">
  <img src="https://raw.githubusercontent.com/ElaMCB/LILIA/main/assets/icon.png" alt="LILIA Logo" width="200"/>
</div>

<div align="center">

![Visual Studio Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![AI](https://img.shields.io/badge/AI-Powered-FF6B6B?style=for-the-badge&logo=artificial-intelligence&logoColor=white)
![Local First](https://img.shields.io/badge/Local%20First-4CAF50?style=for-the-badge&logo=home-assistant&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=mit&logoColor=black)

![Version](https://img.shields.io/github/package-json/v/ElaMCB/LILIA?style=flat-square&label=version)
![License](https://img.shields.io/github/license/ElaMCB/LILIA?style=flat-square)
![Issues](https://img.shields.io/github/issues-raw/ElaMCB/LILIA?style=flat-square&label=issues)
![Stars](https://img.shields.io/github/stars/ElaMCB/LILIA?style=flat-square&label=stars)

![Ethical AI](https://img.shields.io/badge/Ethical%20AI-9C27B0?style=flat-square&logo=shield-check&logoColor=white)
![Open Source](https://img.shields.io/badge/Open%20Source-FF6B00?style=flat-square&logo=open-source-initiative&logoColor=white)
![No Tracking](https://img.shields.io/badge/No%20Tracking-brightgreen?style=flat-square&logo=privacy&logoColor=white)
![Free Forever](https://img.shields.io/badge/Free%20Forever-blue?style=flat-square&logo=freecodecamp&logoColor=white)

![Ollama](https://img.shields.io/badge/Ollama-000000?style=flat-square&logo=ollama&logoColor=white)
![Multi-Agent](https://img.shields.io/badge/Multi--Agent-FF9800?style=flat-square&logo=robot&logoColor=white)
![VS Code Extension](https://img.shields.io/badge/VS%20Code%20Extension-0066CC?style=flat-square&logo=visual-studio-code&logoColor=white)

</div>

> **Cursor Alternative That Respects Your Privacy & Wallet**
> 
> Why pay $20/month when you can have **better AI assistance for free**? LILIA proves that ethical AI tooling isn't a luxury—it's infrastructure for the next million developers.

## About

**LILIA** is an open-source, privacy-first Visual Studio Code extension that provides AI-powered development assistance through a multi-agent system. Unlike subscription-based tools like Cursor or GitHub Copilot, LILIA runs entirely locally using Ollama, ensuring complete code privacy while delivering intelligent code review, automated testing, security analysis, and documentation generation.

### Built for Global Developers
Whether you're a student in Mumbai, a junior dev in Lagos, or a hobbyist in rural Arkansas, LILIA gives you enterprise-grade AI assistance without the enterprise price tag. We believe great coders are born everywhere, and AI assistance should be a productivity multiplier, not a privilege.

### Privacy-First Architecture
Your code never leaves your machine. LILIA uses local AI models through Ollama, eliminating cloud dependencies and ensuring your intellectual property, trade secrets, and sensitive code remain completely private. Perfect for government, healthcare, financial, and proprietary development.

### Multi-Agent AI System
LILIA's orchestrated agent system provides specialized assistance:
- **Code Review Agent** - Intelligent bug detection and improvement suggestions
- **Test Generator Agent** - Automated test creation with meaningful coverage
- **Security Agent** - Vulnerability scanning and security best practices
- **Documentation Agent** - Human-readable documentation generation and maintenance

### Key Differentiators
- **100% Local AI Processing** - No cloud dependencies, complete privacy
- **Multi-Agent System** - Specialized AI agents for code review, testing, security & documentation
- **Ethical AI Philosophy** - Free forever, no tracking, open-source transparency
- **VS Code Native** - Seamless integration with your existing workflow
- **Community-Driven** - Built by developers, for developers

### Perfect For
- Privacy-conscious developers who want AI assistance without data exposure
- Students and indie developers who can't afford $20/month subscriptions
- Teams working on sensitive code that can't leave their infrastructure
- Open-source contributors who believe in ethical AI tooling
- Educators teaching AI-assisted development responsibly

> Initial spark: LILIA 0.1 – exiled code, beautiful terminal.

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ElaMCB/LILIA.git
cd LILIA

# 2. Install dependencies
npm install

# 3. Install Ollama (for local AI)
# Visit https://ollama.ai and install, then:
ollama pull llama2

# 4. Build the extension
npm run compile

# 5. Press F5 in VS Code to launch
```

**That's it!** LILIA is now running. See [Getting Started](#getting-started) for detailed configuration.

## What Makes LILIA Different

### The Problem With Current AI Coding Tools
- **Paywall Gatekeeping** - $20/month excludes developers in emerging markets
- **Privacy Invasion** - Your code sent to external servers
- **Vendor Lock-in** - Closed source, no transparency
- **One-size-fits-all** - Generic AI without specialization

### LILIA's Ethical Solution
- **100% Free & Open Source** - MIT licensed, community-driven
- **Local-First AI** - Ollama integration, code stays on your machine
- **Multi-Agent Intelligence** - Specialized agents for different tasks
- **Privacy by Design** - No telemetry unless you opt-in
- **Developer Empowerment** - Forkable, customizable, transparent

## Pay-wall vs. Play-wall: why I'm building LILIA

Cursor is fantastic—intelligent refactor, inline chat, multi-file edits, all the buzzwords.

It's also $20 / month, per user, after a brief free tier.

That sounds small until you notice:
- A junior dev in Lagos earns ~$400 / month.
- A computer-science class in Mumbai has 120 students.
- A hobbyist in rural Arkansas already pays $80 / month for home fibre.

Suddenly "just $20" becomes a gate, not a convenience.

### What the pay-wall really does

**Rations talent**  
Great coders are born everywhere, but AI assistance is now a productivity multiplier. Forcing them to choose between food and autocomplete is an ethical regression.

**Kills side-projects**  
The next Django, FastAPI or Pandas often starts at 2 a.m. in a dorm. If the IDE meter is running, experimentation stops early.

**Ships your code to someone else's cloud**  
Most paid AI-IDEs send full file context to external endpoints. Trade secrets, medical, or gov-code now sit on a third-party log disk.

**Creates a two-tier profession**  
Engineers with corporate expense accounts get Copilot + Cursor + GPT-4o stacked; indie devs revert to vanilla editors. Same language, unequal weapons.

### My answer: build LILIA

- **100% local-first**—Ollama, Llama-cpp or any OpenAI-compatible endpoint you point at.
- **One-click VS Code extension**—no new editor to learn.
- **MIT licence**—forever free, forever forkable.
- **Plug-and-play agents**—code-review, test-gen, doc-write, security-scan; enable only what you need.
- **No telemetry unless you opt-in**—your code never leaves your machine.

### Ethical design choices I'm baking in

| Principle | LILIA approach | Cursor / paid clones |
|-----------|----------------|----------------------|
| Cost | Free, self-hosted | Subscription |
| Privacy | Local inference default | Cloud inference |
| Transparency | Open weights + open issues | Black-box models |
| Modularity | Enable / disable each agent | Bundled features |
| Community | Accept PRs, no CLA | Closed repo |

### Call to action

- **Star or fork the repo**—signal that free, ethical AI-dev tools matter.
- **Open issues for must-have agents**; I'll prioritise community requests over my own wish-list.
- **Share your GPU / CPU benchmarks** so we can publish realistic local-model performance guides—proof that "free" doesn't mean "slow".
- **If you're a student or indie, become a beta tester**—your feedback keeps the pay-wall from creeping back in disguised as "enterprise features".

### Bottom line

Commercial editors can chase ARPU; we'll chase access.

Because ethical AI tooling isn't a luxury—it's infrastructure for the next million developers who can't expense a subscription.

Let's give them LILIA: code-assist without rent-seek, intelligence without invoices.

See you in the repo.

---

## Features

### Your Agent Army

Think of LILIA as your personal development team—except these teammates never sleep, never complain, and actually understand your codebase. Each agent specializes in what they do best, and they're not afraid to talk to each other when things get complex.

**The Orchestrator**: A smart manager that routes your requests to the right agent, remembers context across sessions, and coordinates multi-agent missions when you need the whole team.

**Agent Memory**: Your agents learn. They remember patterns in your code, your preferences, and the context of your project. Every interaction makes them better at helping you.

**Collaboration**: When one agent hits a wall, they call in backup. Security Agent needs Code Review's insights? They talk. Documentation Agent needs Test Generator's test cases? They collaborate. It's like having a team that actually communicates.

### The Agents

#### Code Review Agent
Your code's first critic—and its best friend. Catches bugs before they become problems, spots security holes before they become vulnerabilities, and suggests improvements that actually make sense. It's like pair programming with someone who never gets tired and always remembers best practices.

#### Test Generator Agent (Coming Soon)
Tired of writing tests? This agent reads your code and writes tests that actually matter. Not just coverage—real, meaningful tests that catch real bugs. It thinks like a developer, not a code generator.

#### Security Agent (Coming Soon)
Your code's security guard. It doesn't just scan—it understands context, recognizes patterns, and spots vulnerabilities that automated scanners miss. It knows the difference between "this is fine" and "this will get you hacked."

#### Documentation Agent (Coming Soon)
Documentation that doesn't suck. This agent reads your code, understands what it does, and writes docs that humans can actually read. It keeps them updated, too—because docs that rot are worse than no docs at all.

### AI Providers

**Ollama** (Default) - Run everything locally. Your code stays on your machine, your data stays private. No API keys, no external calls, no privacy concerns. Just pure, local AI power.

**Hugging Face** - Free APIs when you need cloud power without the cloud price tag.

**OpenAI** - Premium models when you need that extra edge. Optional, but powerful.

## Getting Started

### Prerequisites

1. **VS Code** (v1.85.0 or higher)
2. **Node.js** (v18 or higher)
3. **Ollama** (for local AI models) - [Install Ollama](https://ollama.ai)

### Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd LILIA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Ollama (if using local AI):
   ```bash
   # Download and install Ollama from https://ollama.ai
   # Pull a model (e.g., llama2)
   ollama pull llama2
   ```

4. Build the extension:
   ```bash
   npm run compile
   ```

5. Press `F5` in VS Code to launch the extension in a new window

### Configuration

Open VS Code settings and search for "LILIA" to configure:

- **AI Provider**: Choose between `ollama`, `huggingface`, or `openai`
- **Ollama Settings**: Configure base URL and model name
- **Enabled Agents**: Select which agents to activate

Example settings.json:
```json
{
  "lilia.ai.provider": "ollama",
  "lilia.ai.ollama.baseUrl": "http://localhost:11434",
  "lilia.ai.ollama.model": "llama2",
  "lilia.agents.enabled": [
    "codeReview",
    "testGenerator",
    "security",
    "documentation"
  ]
}
```

## Usage

### Code Review

1. **Review entire file**:
   - Right-click in editor → `Code Review: Review Current File`
   - Or use Command Palette: `Code Review: Review Current File`

2. **Review selection**:
   - Select code → Right-click → `Code Review: Review Selection`

3. **View results**:
   - Review results appear in the output channel
   - Suggestions are shown as diagnostics in the editor
   - Click on suggestions to see details

### Agent Panel

- Open the Agent Panel via Command Palette: `Show Agent Panel`
- Or click the LILIA status bar item
- View all active agents and their capabilities

### Agent Chat

- Command Palette → `Agent Chat: Talk to Agent`
- Select an agent and ask questions
- Agents understand code context automatically

## Architecture

```
LILIA Extension
├── Agent Manager (Orchestration)
│   ├── Agent Registry
│   ├── Request Router
│   ├── Agent Memory
│   └── Communication Layer
├── Specialized Agents
│   ├── Code Review Agent
│   ├── Test Generator Agent
│   ├── Security Agent
│   └── Documentation Agent
├── AI Providers
│   ├── Ollama Provider
│   ├── HuggingFace Provider
│   └── OpenAI Provider
└── UI Components
    ├── Agent Panel
    ├── Status Bar
    └── Command Palette Integration
```

## Development

### Project Structure

```
src/
├── extension.ts          # Main extension entry point
├── agents/
│   ├── manager.ts       # Agent Manager/Orchestrator
│   ├── base-agent.ts    # Base agent class
│   ├── code-review-agent.ts
│   ├── memory.ts        # Agent memory system
│   └── [future agents]
├── ai/
│   └── providers.ts     # AI provider abstractions
├── ui/
│   └── agent-panel.ts   # UI components
├── types/
│   └── agent.ts         # TypeScript interfaces
└── utils/
    └── file-reader.ts   # File utilities
```

### Adding a New Agent

1. Create a new agent class extending `BaseAgent`:
   ```typescript
   import { BaseAgent } from './base-agent';
   import { AgentContext, AgentResponse } from '../types/agent';
   import { AIProvider } from '../ai/providers';

   export class MyAgent extends BaseAgent {
     constructor(aiProvider: AIProvider) {
       super('myAgent', 'My Agent', 'Description', aiProvider, []);
     }

     async process(context: AgentContext, request?: string): Promise<AgentResponse> {
       // Your agent logic here
     }
   }
   ```

2. Register it in `AgentManager.initializeAgents()`

3. Add commands in `extension.ts`

### Building

```bash
npm run compile    # Compile TypeScript
npm run watch      # Watch mode for development
```

## Roadmap

### Phase 1: Foundation (Complete)
- [x] VS Code extension structure
- [x] Agent framework
- [x] Code Review Agent
- [x] Ollama integration
- [x] Basic UI

### Phase 2: More Agents (In Progress)
- [ ] Test Generator Agent
- [ ] Security Agent
- [ ] Documentation Agent
- [ ] Performance Agent

### Phase 3: Advanced Features
- [ ] Agent learning from feedback
- [ ] Multi-agent collaboration workflows
- [ ] Custom model fine-tuning
- [ ] UAA integration
- [ ] Portfolio automation

### Phase 4: Polish
- [ ] Advanced UI/UX
- [ ] Performance optimization
- [ ] Comprehensive documentation
- [ ] Unit tests

## Support Ethical AI Development

### Why Your Support Matters
Every star, fork, and contribution helps us prove that ethical AI tooling can compete with venture-backed alternatives. Your support:

- **Validates the mission** - Shows the world wants privacy-first AI tools
- **Attracts contributors** - Builds momentum for community-driven development  
- **Improves the tool** - More eyes = better code, more features, faster development
- **Keeps it free** - Community support prevents the need for paywalls

### Get Involved
- **Star the repo** - Takes 2 seconds, helps immensely
- **Fork & contribute** - Code, docs, or ideas all welcome
- **Report issues** - Help us build what you actually need
- **Spread the word** - Share with developers who need free AI tools
- **Join discussions** - Shape the future of ethical AI tooling

**[Star LILIA](https://github.com/ElaMCB/LILIA)** • **[Try it now](#getting-started)** • **[Contribute](#contributing)**

## Contributing

This is a personal project, but suggestions and feedback are welcome! We're building LILIA to be community-driven and ethical from the ground up.

### How to Contribute
1. **Code Contributions** - Fork, make changes, submit a PR
2. **Documentation** - Improve docs, add examples, fix typos
3. **Feature Requests** - Open an issue with your ideas
4. **Bug Reports** - Help us catch and fix issues
5. **Testing** - Try LILIA and share your experience

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - feel free to customize for your needs!

## Acknowledgments

- Built on VS Code Extension API
- Uses Ollama for local AI models
- Inspired by modern AI-assisted development tools

---

**Code and AI as creed.**
