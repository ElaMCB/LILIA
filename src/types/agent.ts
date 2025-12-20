/**
 * Core types for the LILIA agent system
 */

export interface AgentContext {
  workspacePath: string;
  currentFile?: string;
  selectedText?: string;
  codebaseContext?: string;
  previousConversations?: AgentMessage[];
}

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system' | 'agent';
  content: string;
  timestamp: Date;
  agentId?: string;
}

export interface AgentResponse {
  success: boolean;
  message: string;
  suggestions?: AgentSuggestion[];
  metadata?: Record<string, any>;
}

export interface AgentSuggestion {
  type: 'info' | 'warning' | 'error' | 'suggestion';
  message: string;
  line?: number;
  range?: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
  code?: string;
  priority?: number;
}

export interface AgentCapability {
  name: string;
  description: string;
  canHandle: (request: string, context: AgentContext) => boolean;
}

export interface IAgent {
  id: string;
  name: string;
  description: string;
  capabilities: AgentCapability[];
  memory: AgentMemory;
  
  process(context: AgentContext, request?: string): Promise<AgentResponse>;
  canHandle(request: string, context: AgentContext): boolean;
  learn(feedback: any): void;
}

export interface AgentMemory {
  store(key: string, value: any): void;
  retrieve(key: string): any;
  clear(): void;
  getAll(): Record<string, any>;
}


