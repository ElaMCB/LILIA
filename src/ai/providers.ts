/**
 * AI Provider Abstraction
 * Supports multiple AI backends (Ollama, HuggingFace, OpenAI)
 */

import axios from 'axios';
import * as vscode from 'vscode';

export interface AIProvider {
  generate(prompt: string, context?: string): Promise<string>;
  isAvailable(): Promise<boolean>;
}

export class OllamaProvider implements AIProvider {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string = 'http://localhost:11434', model: string = 'llama2') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`, { timeout: 2000 });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async generate(prompt: string, context?: string): Promise<string> {
    try {
      const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
      
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt: fullPrompt,
        stream: false
      }, {
        timeout: 30000
      });

      return response.data.response || '';
    } catch (error: any) {
      throw new Error(`Ollama API error: ${error.message}`);
    }
  }
}

export class HuggingFaceProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'mistralai/Mistral-7B-Instruct-v0.2') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    // Placeholder - would need HuggingFace API implementation
    throw new Error('HuggingFace provider not yet implemented');
  }
}

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-3.5-turbo') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async generate(prompt: string, context?: string): Promise<string> {
    // Placeholder - would need OpenAI API implementation
    throw new Error('OpenAI provider not yet implemented');
  }
}

export class AIProviderFactory {
  static create(config: vscode.WorkspaceConfiguration): AIProvider {
    const provider = config.get<string>('lilia.ai.provider', 'ollama');

    switch (provider) {
      case 'ollama':
        const ollamaUrl = config.get<string>('lilia.ai.ollama.baseUrl', 'http://localhost:11434');
        const ollamaModel = config.get<string>('lilia.ai.ollama.model', 'llama2');
        return new OllamaProvider(ollamaUrl, ollamaModel);
      
      case 'huggingface':
        const hfKey = config.get<string>('lilia.ai.huggingface.apiKey', '');
        return new HuggingFaceProvider(hfKey);
      
      case 'openai':
        const openaiKey = config.get<string>('lilia.ai.openai.apiKey', '');
        return new OpenAIProvider(openaiKey);
      
      default:
        return new OllamaProvider();
    }
  }
}


