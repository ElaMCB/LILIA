/**
 * Base Agent Implementation
 * All specialized agents extend this class
 */

import { IAgent, AgentContext, AgentResponse, AgentCapability, AgentMemory, AgentMessage } from '../types/agent';
import { SimpleAgentMemory } from './memory';
import { AIProvider } from '../ai/providers';

export abstract class BaseAgent implements IAgent {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly capabilities: AgentCapability[];
  public readonly memory: AgentMemory;
  protected aiProvider: AIProvider;

  constructor(
    id: string,
    name: string,
    description: string,
    aiProvider: AIProvider,
    capabilities: AgentCapability[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capabilities = capabilities;
    this.memory = new SimpleAgentMemory();
    this.aiProvider = aiProvider;
  }

  abstract process(context: AgentContext, request?: string): Promise<AgentResponse>;

  canHandle(request: string, context: AgentContext): boolean {
    return this.capabilities.some(cap => cap.canHandle(request, context));
  }

  learn(feedback: any): void {
    // Store feedback for learning
    this.memory.store(`feedback_${Date.now()}`, feedback);
  }

  protected async callAI(prompt: string, context?: string): Promise<string> {
    try {
      return await this.aiProvider.generate(prompt, context);
    } catch (error: any) {
      throw new Error(`AI call failed: ${error.message}`);
    }
  }

  protected createResponse(
    success: boolean,
    message: string,
    suggestions?: any[],
    metadata?: Record<string, any>
  ): AgentResponse {
    return {
      success,
      message,
      suggestions,
      metadata
    };
  }
}


