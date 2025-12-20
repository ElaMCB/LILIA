# LILIA - Your Custom AI IDE with Agent System

<div align="center">
  <img src="https://raw.githubusercontent.com/ElaMCB/LILIA/main/assets/icon.png" alt="LILIA Logo" width="200"/>
  
  **LILIA** is a highly customizable VS Code extension that provides an AI-powered development environment with multiple specialized agents working together.
</div>

> Initial spark: LILIA 0.1 – exiled code, beautiful terminal.

## Features

### Core Architecture
- **Agent System**: Multiple specialized AI agents that can work independently or collaborate
- **Agent Manager**: Intelligent routing and orchestration of agent requests
- **Agent Memory**: Context-aware agents that learn from your codebase
- **Multi-Agent Collaboration**: Agents can consult each other for complex tasks

### Available Agents

#### Code Review Agent
- Reviews code for quality, best practices, and potential bugs
- Provides actionable feedback with line-specific suggestions
- Detects security issues, performance problems, and code smells

#### Test Generator Agent (Coming Soon)
- Generates unit tests from code
- Creates integration test suites
- Suggests test scenarios

#### Security Agent (Coming Soon)
- Scans code for vulnerabilities
- Checks for security best practices
- Identifies potential exploits

#### Documentation Agent (Coming Soon)
- Auto-generates documentation
- Updates existing docs
- Creates API references

### AI Providers
- **Ollama** (Default) - Run AI models locally for privacy
- **Hugging Face** - Free AI APIs
- **OpenAI** - Premium AI models (optional)

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

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to customize for your needs!

## Acknowledgments

- Built on VS Code Extension API
- Uses Ollama for local AI models
- Inspired by modern AI-assisted development tools

---

**Code and AI as creed.**
