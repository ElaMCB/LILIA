# LILIA Quick Start Guide

Get up and running with LILIA in 5 minutes!

## Prerequisites Check

- ✅ VS Code installed
- ✅ Node.js (v18+) installed
- ⚠️ Ollama installed (optional but recommended)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Ollama (Recommended for Local AI)

**Install Ollama:**
- Windows: Download from [ollama.ai](https://ollama.ai)
- Mac: `brew install ollama`
- Linux: `curl https://ollama.ai/install.sh | sh`

**Start Ollama and pull a model:**
```bash
# Start Ollama service (usually auto-starts)
ollama serve

# In another terminal, pull a model
ollama pull llama2
# or
ollama pull mistral
# or
ollama pull codellama
```

**Verify Ollama is running:**
```bash
curl http://localhost:11434/api/tags
```

### 3. Build the Extension

```bash
npm run compile
```

### 4. Launch Extension

1. Open this project in VS Code
2. Press `F5` (or Run → Start Debugging)
3. A new VS Code window opens with LILIA loaded

## First Use

### Try Code Review

1. In the new VS Code window, open any code file
2. Right-click → **Code Review: Review Current File**
3. Wait for the agent to analyze (first run may take longer)
4. View results in:
   - Output channel: "LILIA Code Review"
   - Editor diagnostics (underlined suggestions)

### Open Agent Panel

1. Click the **🤖 LILIA** status bar item (bottom right)
2. Or Command Palette (`Ctrl+Shift+P`) → **Show Agent Panel**
3. See all available agents and their status

### Chat with Agents

1. Command Palette → **Agent Chat: Talk to Agent**
2. Select an agent (e.g., Code Review Agent)
3. Ask a question like: "Review this code for security issues"

## Configuration

Open VS Code Settings (`Ctrl+,`) and search for "LILIA":

**Basic Settings:**
```json
{
  "lilia.ai.provider": "ollama",
  "lilia.ai.ollama.model": "llama2"
}
```

**If Ollama is on a different port:**
```json
{
  "lilia.ai.ollama.baseUrl": "http://localhost:11434"
}
```

## Troubleshooting

### "Ollama connection failed"
- Check if Ollama is running: `ollama list`
- Verify the base URL in settings
- Try: `curl http://localhost:11434/api/tags`

### "No agents available"
- Check settings → `lilia.agents.enabled`
- Should include at least: `["codeReview"]`

### Extension doesn't load
- Run `npm run compile` first
- Check Output panel → "Log (Extension Host)"
- Restart VS Code

### Slow responses
- Use a smaller/faster model (e.g., `mistral` instead of `llama2`)
- Check Ollama is using GPU acceleration
- Reduce code size for review

## Next Steps

- Read the full [README.md](README.md)
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to add new agents
- Customize agents for your workflow

## Example Workflows

### Daily Code Review
1. Write code
2. Right-click → Code Review
3. Fix issues before commit

### Selection Review
1. Select suspicious code block
2. Right-click → Code Review: Review Selection
3. Get targeted feedback

### Agent Consultation
1. Agent Chat → Code Review Agent
2. Ask: "What's wrong with this function?"
3. Get detailed analysis

---

**Happy coding with LILIA! 🤖**


