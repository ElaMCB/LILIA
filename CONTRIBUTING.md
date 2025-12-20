# Contributing to LILIA

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Compile**
   ```bash
   npm run compile
   # or watch mode
   npm run watch
   ```

3. **Run in Development**
   - Press `F5` in VS Code to launch extension development host
   - Or use "Run Extension" from the debug panel

## Adding a New Agent

### Step 1: Create Agent Class

Create a new file in `src/agents/` (e.g., `my-agent.ts`):

```typescript
import { BaseAgent } from './base-agent';
import { AgentContext, AgentResponse, AgentCapability } from '../types/agent';
import { AIProvider } from '../ai/providers';

export class MyAgent extends BaseAgent {
  constructor(aiProvider: AIProvider) {
    const capabilities: AgentCapability[] = [
      {
        name: 'my_capability',
        description: 'What this agent can do',
        canHandle: (request: string, context: AgentContext) => {
          // Return true if this agent should handle the request
          return request.toLowerCase().includes('keyword');
        }
      }
    ];

    super(
      'myAgent',           // ID (must be unique)
      'My Agent',          // Display name
      'Agent description', // Description
      aiProvider,
      capabilities
    );
  }

  async process(context: AgentContext, request?: string): Promise<AgentResponse> {
    try {
      // Your agent logic here
      // Access code via context.selectedText or context.currentFile
      // Use this.callAI() to interact with AI
      
      const prompt = `Your prompt here: ${context.selectedText}`;
      const aiResponse = await this.callAI(prompt);

      return this.createResponse(
        true,
        'Success message',
        [], // suggestions array
        {}  // optional metadata
      );
    } catch (error: any) {
      return this.createResponse(
        false,
        `Error: ${error.message}`,
        []
      );
    }
  }
}
```

### Step 2: Register Agent

In `src/agents/manager.ts`, add to `initializeAgents()`:

```typescript
if (enabledAgents.includes('myAgent')) {
  const myAgent = new MyAgent(this.aiProvider);
  this.registerAgent(myAgent);
}
```

### Step 3: Add Commands

In `src/extension.ts`:

1. Add command to `package.json` contributes.commands
2. Register command handler in `activate()` function

Example:
```typescript
vscode.commands.registerCommand('lilia.myAgent', async () => {
  // Handle command
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  
  const context: AgentContext = {
    workspacePath: getWorkspacePath() || '',
    currentFile: editor.document.uri.fsPath,
    selectedText: editor.document.getText()
  };
  
  const response = await agentManager.requestAgent('myAgent', context);
  // Handle response
});
```

## Adding a New AI Provider

1. Create provider class in `src/ai/providers.ts`:

```typescript
export class MyProvider implements AIProvider {
  async isAvailable(): Promise<boolean> {
    // Check if provider is available
  }

  async generate(prompt: string, context?: string): Promise<string> {
    // Call your AI API and return response
  }
}
```

2. Add to `AIProviderFactory.create()` in the same file

3. Add configuration options to `package.json` contributes.configuration

## Testing

```bash
npm test
```

## Code Style

- Use TypeScript strict mode
- Follow existing code style
- Add JSDoc comments for public methods
- Handle errors gracefully


