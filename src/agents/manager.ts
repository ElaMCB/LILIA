/**
 * Agent Manager
 * Orchestrates multiple agents, routes requests, and manages agent communication
 */

import * as vscode from 'vscode';
import { IAgent, AgentContext, AgentResponse, AgentMessage } from '../types/agent';
import { AIProvider, AIProviderFactory } from '../ai/providers';
import { CodeReviewAgent } from './code-review-agent';

export class AgentManager {
  private agents: Map<string, IAgent> = new Map();
  private activeAgents: Set<string> = new Set();
  private conversationHistory: AgentMessage[] = [];
  private config: vscode.WorkspaceConfiguration;
  private aiProvider: AIProvider;

  constructor(config: vscode.WorkspaceConfiguration) {
    this.config = config;
    this.aiProvider = AIProviderFactory.create(config);
    this.initializeAgents();
  }

  private initializeAgents(): void {
    const enabledAgents = this.config.get<string[]>('lilia.agents.enabled', [
      'codeReview',
      'testGenerator',
      'security',
      'documentation'
    ]);

    // Initialize Code Review Agent
    if (enabledAgents.includes('codeReview')) {
      const codeReviewAgent = new CodeReviewAgent(this.aiProvider);
      this.registerAgent(codeReviewAgent);
    }

    // TODO: Initialize other agents as they are implemented
    // if (enabledAgents.includes('testGenerator')) { ... }
    // if (enabledAgents.includes('security')) { ... }
    // if (enabledAgents.includes('documentation')) { ... }
  }

  registerAgent(agent: IAgent): void {
    this.agents.set(agent.id, agent);
    this.activeAgents.add(agent.id);
  }

  unregisterAgent(agentId: string): void {
    this.agents.delete(agentId);
    this.activeAgents.delete(agentId);
  }

  getAgent(agentId: string): IAgent | undefined {
    return this.agents.get(agentId);
  }

  getAllAgents(): IAgent[] {
    return Array.from(this.agents.values());
  }

  getActiveAgents(): IAgent[] {
    return Array.from(this.activeAgents)
      .map(id => this.agents.get(id))
      .filter((agent): agent is IAgent => agent !== undefined);
  }

  /**
   * Route a request to the most appropriate agent(s)
   */
  async routeRequest(request: string, context: AgentContext): Promise<AgentResponse[]> {
    const responses: AgentResponse[] = [];
    
    // Find agents that can handle this request
    const capableAgents = this.getActiveAgents().filter(agent => 
      agent.canHandle(request, context)
    );

    if (capableAgents.length === 0) {
      // No specific agent found, try all agents
      const allAgents = this.getActiveAgents();
      if (allAgents.length > 0) {
        // Default to code review agent if available
        const defaultAgent = allAgents.find(a => a.id === 'codeReview') || allAgents[0];
        const response = await defaultAgent.process(context, request);
        responses.push(response);
      }
    } else {
      // Process with capable agents (can run in parallel)
      const promises = capableAgents.map(agent => agent.process(context, request));
      const agentResponses = await Promise.all(promises);
      responses.push(...agentResponses);
    }

    // Store conversation
    this.addToHistory({
      role: 'user',
      content: request,
      timestamp: new Date()
    });

    responses.forEach(response => {
      this.addToHistory({
        role: 'agent',
        content: response.message,
        timestamp: new Date(),
        agentId: 'manager'
      });
    });

    return responses;
  }

  /**
   * Direct request to a specific agent
   */
  async requestAgent(agentId: string, context: AgentContext, request?: string): Promise<AgentResponse> {
    const agent = this.getAgent(agentId);
    if (!agent) {
      return {
        success: false,
        message: `Agent ${agentId} not found`,
        suggestions: []
      };
    }

    const response = await agent.process(context, request);
    return response;
  }

  /**
   * Multi-agent collaboration: one agent can consult another
   */
  async consultAgent(
    requestingAgentId: string,
    consultedAgentId: string,
    context: AgentContext,
    question: string
  ): Promise<AgentResponse> {
    const consultedAgent = this.getAgent(consultedAgentId);
    if (!consultedAgent) {
      return {
        success: false,
        message: `Consulted agent ${consultedAgentId} not found`,
        suggestions: []
      };
    }

    // Add context that this is a consultation
    const consultationContext = {
      ...context,
      codebaseContext: `[Consultation from ${requestingAgentId}]: ${question}\n\n${context.codebaseContext || ''}`
    };

    return await consultedAgent.process(consultationContext, question);
  }

  addToHistory(message: AgentMessage): void {
    this.conversationHistory.push(message);
    // Keep only last 100 messages
    if (this.conversationHistory.length > 100) {
      this.conversationHistory.shift();
    }
  }

  getHistory(): AgentMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  updateConfig(config: vscode.WorkspaceConfiguration): void {
    this.config = config;
    this.aiProvider = AIProviderFactory.create(config);
    // Reinitialize agents with new config
    this.agents.clear();
    this.activeAgents.clear();
    this.initializeAgents();
  }
}


