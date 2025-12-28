# AI Provider Implementation Guide

## Overview

LILIA IDE uses a universal AI provider interface that allows seamless integration with multiple AI services. This document outlines how to implement and configure each provider.

## Universal Provider Interface

```typescript
// src/ai-providers/interface.ts
export interface AIProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  generateCode(prompt: string, context: CodeContext): Promise<CodeResponse>;
  reviewCode(code: string, context: ProjectContext): Promise<ReviewResponse>;
  explainCode(code: string): Promise<ExplanationResponse>;
  suggestImprovements(code: string): Promise<ImprovementResponse>;
  getCost(): number;
  getFreeTierRemaining(): Promise<number>;
  getUsageStats(): UsageStats;
}

export interface CodeContext {
  currentFile: string;
  relatedFiles: string[];
  projectStructure: ProjectStructure;
  recentChanges: GitHistory;
  codingPatterns: CodeStyle;
  dependencies: DependencyInfo;
}

export interface CodeResponse {
  code: string;
  explanation?: string;
  confidence: number;
  provider: string;
  tokensUsed?: number;
  cost?: number;
}
```

## DeepSeek Provider

### Setup

1. **Get API Key**
   - Visit https://platform.deepseek.com
   - Sign up for free account
   - Generate API key
   - Free tier: 1000 requests/day

2. **Configuration**

```typescript
// src/ai-providers/deepseek.ts
import { AIProvider, CodeContext, CodeResponse } from './interface';
import axios from 'axios';

export class DeepSeekProvider implements AIProvider {
  name = 'deepseek';
  private apiKey: string;
  private endpoint = 'https://api.deepseek.com/v1/chat/completions';
  private freeTierLimit = 1000;
  private dailyUsage = 0;

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get('https://api.deepseek.com/health', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async generateCode(prompt: string, context: CodeContext): Promise<CodeResponse> {
    if (this.dailyUsage >= this.freeTierLimit) {
      throw new Error('DeepSeek free tier limit reached');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a code generation assistant. Generate code based on the following context:
        Current file: ${context.currentFile}
        Related files: ${context.relatedFiles.join(', ')}
        Project structure: ${JSON.stringify(context.projectStructure)}
        Coding patterns: ${JSON.stringify(context.codingPatterns)}`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const response = await axios.post(
      this.endpoint,
      {
        model: 'deepseek-coder',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    this.dailyUsage++;

    return {
      code: response.data.choices[0].message.content,
      confidence: 0.9,
      provider: 'deepseek',
      tokensUsed: response.data.usage.total_tokens,
      cost: 0 // Free tier
    };
  }

  async reviewCode(code: string, context: ProjectContext): Promise<ReviewResponse> {
    // Similar implementation for code review
    const prompt = `Review the following code for bugs, security issues, and improvements:\n\n${code}`;
    // ... implementation
  }

  async explainCode(code: string): Promise<ExplanationResponse> {
    // Similar implementation for code explanation
    // ...
  }

  async suggestImprovements(code: string): Promise<ImprovementResponse> {
    // Similar implementation for improvements
    // ...
  }

  getCost(): number {
    return 0; // Free tier
  }

  async getFreeTierRemaining(): Promise<number> {
    return Math.max(0, this.freeTierLimit - this.dailyUsage);
  }

  getUsageStats(): UsageStats {
    return {
      provider: 'deepseek',
      calls: this.dailyUsage,
      cost: 0,
      freeTierRemaining: this.freeTierLimit - this.dailyUsage
    };
  }
}
```

### Environment Variables

```bash
# .env
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_FREE_TIER_LIMIT=1000
```

## Kimi Provider

### Setup

1. **Get API Key**
   - Visit https://platform.kimi.com (or equivalent)
   - Sign up for free account
   - Generate API key
   - Free tier: 500 requests/day

2. **Configuration**

```typescript
// src/ai-providers/kimi.ts
import { AIProvider, CodeContext, CodeResponse } from './interface';
import axios from 'axios';

export class KimiProvider implements AIProvider {
  name = 'kimi';
  private apiKey: string;
  private endpoint = 'https://api.kimi.com/v1/chat/completions';
  private freeTierLimit = 500;
  private dailyUsage = 0;

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get('https://api.kimi.com/health', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async generateCode(prompt: string, context: CodeContext): Promise<CodeResponse> {
    if (this.dailyUsage >= this.freeTierLimit) {
      throw new Error('Kimi free tier limit reached');
    }

    // Kimi is particularly good at code explanation
    const messages = [
      {
        role: 'system',
        content: `You are a code explanation and generation assistant. Focus on clarity and understanding.`
      },
      {
        role: 'user',
        content: `${prompt}\n\nContext: ${JSON.stringify(context)}`
      }
    ];

    const response = await axios.post(
      this.endpoint,
      {
        model: 'kimi-coder',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    this.dailyUsage++;

    return {
      code: response.data.choices[0].message.content,
      explanation: response.data.choices[0].message.explanation,
      confidence: 0.85,
      provider: 'kimi',
      tokensUsed: response.data.usage.total_tokens,
      cost: 0 // Free tier
    };
  }

  // Similar implementations for other methods...
  async reviewCode(code: string, context: ProjectContext): Promise<ReviewResponse> {
    // Implementation
  }

  async explainCode(code: string): Promise<ExplanationResponse> {
    // Kimi excels at explanations
    // ...
  }

  async suggestImprovements(code: string): Promise<ImprovementResponse> {
    // Implementation
  }

  getCost(): number {
    return 0; // Free tier
  }

  async getFreeTierRemaining(): Promise<number> {
    return Math.max(0, this.freeTierLimit - this.dailyUsage);
  }

  getUsageStats(): UsageStats {
    return {
      provider: 'kimi',
      calls: this.dailyUsage,
      cost: 0,
      freeTierRemaining: this.freeTierLimit - this.dailyUsage
    };
  }
}
```

### Environment Variables

```bash
# .env
KIMI_API_KEY=your_api_key_here
KIMI_FREE_TIER_LIMIT=500
```

## Ollama Provider (Local)

### Setup

1. **Install Ollama**
   ```bash
   # macOS/Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows
   # Download from https://ollama.ai/download
   ```

2. **Pull Models**
   ```bash
   ollama pull codellama
   ollama pull deepseek-coder
   ollama pull llama2
   ```

3. **Configuration**

```typescript
// src/ai-providers/ollama.ts
import { AIProvider, CodeContext, CodeResponse } from './interface';
import axios from 'axios';

export class OllamaProvider implements AIProvider {
  name = 'ollama';
  private endpoint = 'http://localhost:11434/api/generate';
  private model = 'codellama';
  private totalUsage = 0;

  constructor(config?: { model?: string; endpoint?: string }) {
    if (config?.model) this.model = config.model;
    if (config?.endpoint) this.endpoint = config.endpoint;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:11434/api/tags');
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async generateCode(prompt: string, context: CodeContext): Promise<CodeResponse> {
    const fullPrompt = `Generate code for: ${prompt}\n\nContext:\n${JSON.stringify(context, null, 2)}`;

    const response = await axios.post(
      this.endpoint,
      {
        model: this.model,
        prompt: fullPrompt,
        stream: false
      }
    );

    this.totalUsage++;

    return {
      code: response.data.response,
      confidence: 0.8, // Local models may have lower confidence
      provider: 'ollama',
      tokensUsed: response.data.eval_count,
      cost: 0 // Always free
    };
  }

  async reviewCode(code: string, context: ProjectContext): Promise<ReviewResponse> {
    const prompt = `Review this code for bugs, security issues, and improvements:\n\n${code}`;
    // ... implementation
  }

  async explainCode(code: string): Promise<ExplanationResponse> {
    const prompt = `Explain this code in detail:\n\n${code}`;
    // ... implementation
  }

  async suggestImprovements(code: string): Promise<ImprovementResponse> {
    const prompt = `Suggest improvements for this code:\n\n${code}`;
    // ... implementation
  }

  getCost(): number {
    return 0; // Always free
  }

  async getFreeTierRemaining(): Promise<number> {
    return Infinity; // Unlimited
  }

  getUsageStats(): UsageStats {
    return {
      provider: 'ollama',
      calls: this.totalUsage,
      cost: 0,
      freeTierRemaining: Infinity
    };
  }
}
```

### Environment Variables

```bash
# .env
OLLAMA_ENDPOINT=http://localhost:11434
OLLAMA_MODEL=codellama
```

## Provider Router

```typescript
// src/ai-providers/router.ts
import { AIProvider } from './interface';
import { DeepSeekProvider } from './deepseek';
import { KimiProvider } from './kimi';
import { OllamaProvider } from './ollama';

export class AIProviderRouter {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = 'local';

  constructor() {
    // Initialize providers
    if (process.env.DEEPSEEK_API_KEY) {
      this.providers.set('deepseek', new DeepSeekProvider({
        apiKey: process.env.DEEPSEEK_API_KEY
      }));
    }

    if (process.env.KIMI_API_KEY) {
      this.providers.set('kimi', new KimiProvider({
        apiKey: process.env.KIMI_API_KEY
      }));
    }

    // Ollama is always available (local)
    this.providers.set('local', new OllamaProvider());
  }

  async selectBestProvider(request: AIRequest): Promise<AIProvider> {
    // Priority 1: Code generation -> DeepSeek
    if (request.type === 'code_generation') {
      const deepseek = this.providers.get('deepseek');
      if (deepseek && await this.hasFreeTier(deepseek)) {
        return deepseek;
      }
    }

    // Priority 2: Code explanation -> Kimi
    if (request.type === 'code_explanation') {
      const kimi = this.providers.get('kimi');
      if (kimi && await this.hasFreeTier(kimi)) {
        return kimi;
      }
    }

    // Priority 3: Privacy/offline -> Local
    if (request.requiresPrivacy || !this.hasInternet()) {
      return this.providers.get('local')!;
    }

    // Priority 4: Free tier availability
    for (const [name, provider] of this.providers) {
      if (name !== 'local' && await this.hasFreeTier(provider)) {
        return provider;
      }
    }

    // Fallback: Always use local (free)
    return this.providers.get('local')!;
  }

  private async hasFreeTier(provider: AIProvider): Promise<boolean> {
    const remaining = await provider.getFreeTierRemaining();
    return remaining > 0;
  }

  private hasInternet(): boolean {
    // Simple check - can be improved
    return navigator.onLine;
  }

  getAllProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  getProvider(name: string): AIProvider | undefined {
    return this.providers.get(name);
  }
}
```

## Usage Example

```typescript
// Example usage in IDE
import { AIProviderRouter } from './ai-providers/router';

const router = new AIProviderRouter();

// Generate code
const provider = await router.selectBestProvider({
  type: 'code_generation',
  requiresPrivacy: false
});

const response = await provider.generateCode(
  'Create a function to sort an array',
  context
);

console.log(response.code);
console.log(`Provider: ${response.provider}`);
console.log(`Cost: $${response.cost}`);
```

## Configuration File

```json
// .lilia/config.json
{
  "aiProviders": {
    "deepseek": {
      "enabled": true,
      "apiKey": "${DEEPSEEK_API_KEY}",
      "freeTierLimit": 1000,
      "preferredFor": ["code_generation"]
    },
    "kimi": {
      "enabled": true,
      "apiKey": "${KIMI_API_KEY}",
      "freeTierLimit": 500,
      "preferredFor": ["code_explanation"]
    },
    "ollama": {
      "enabled": true,
      "endpoint": "http://localhost:11434",
      "model": "codellama",
      "preferredFor": ["privacy", "offline"]
    }
  },
  "routing": {
    "strategy": "cost_optimized",
    "fallback": "local",
    "privacyMode": false
  }
}
```

## Testing Providers

```typescript
// tests/ai-providers.test.ts
import { DeepSeekProvider } from '../src/ai-providers/deepseek';
import { KimiProvider } from '../src/ai-providers/kimi';
import { OllamaProvider } from '../src/ai-providers/ollama';

describe('AI Providers', () => {
  test('DeepSeek provider works', async () => {
    const provider = new DeepSeekProvider({
      apiKey: process.env.DEEPSEEK_API_KEY!
    });
    
    expect(await provider.isAvailable()).toBe(true);
    
    const response = await provider.generateCode(
      'Hello world function',
      mockContext
    );
    
    expect(response.code).toBeDefined();
    expect(response.provider).toBe('deepseek');
  });

  // Similar tests for Kimi and Ollama...
});
```

---

**This universal provider system allows LILIA IDE to leverage multiple AI services while maintaining cost optimization and privacy controls.**

