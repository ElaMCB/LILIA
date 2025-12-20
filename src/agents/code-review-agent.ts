/**
 * Code Review Agent
 * Specialized agent for reviewing code quality, best practices, and potential issues
 */

import { BaseAgent } from './base-agent';
import { AgentContext, AgentResponse, AgentCapability, AgentSuggestion } from '../types/agent';
import { AIProvider } from '../ai/providers';

export class CodeReviewAgent extends BaseAgent {
  constructor(aiProvider: AIProvider) {
    const capabilities: AgentCapability[] = [
      {
        name: 'code_review',
        description: 'Reviews code for quality, bugs, and best practices',
        canHandle: (request: string) => {
          const keywords = ['review', 'check', 'analyze', 'inspect', 'quality'];
          return keywords.some(keyword => request.toLowerCase().includes(keyword));
        }
      },
      {
        name: 'bug_detection',
        description: 'Detects potential bugs and issues',
        canHandle: (request: string) => {
          const keywords = ['bug', 'error', 'issue', 'problem', 'fix'];
          return keywords.some(keyword => request.toLowerCase().includes(keyword));
        }
      }
    ];

    super(
      'codeReview',
      'Code Review Agent',
      'Reviews code for quality, best practices, and potential issues',
      aiProvider,
      capabilities
    );
  }

  async process(context: AgentContext, request?: string): Promise<AgentResponse> {
    try {
      // File content should be passed in context.selectedText by the extension
      const codeToReview = context.selectedText;
      
      if (!codeToReview) {
        return this.createResponse(
          false,
          'No code provided for review. Please select code or open a file.',
          []
        );
      }

      const prompt = this.buildReviewPrompt(codeToReview, request);
      const aiResponse = await this.callAI(prompt, this.buildContext(context));

      const suggestions = this.parseAIResponse(aiResponse, codeToReview);
      
      return this.createResponse(
        true,
        `Code review completed. Found ${suggestions.length} suggestion(s).`,
        suggestions,
        {
          reviewedLines: codeToReview.split('\n').length,
          timestamp: new Date().toISOString()
        }
      );
    } catch (error: any) {
      return this.createResponse(
        false,
        `Code review failed: ${error.message}`,
        []
      );
    }
  }

  private buildReviewPrompt(code: string, customRequest?: string): string {
    const basePrompt = `You are an expert code reviewer. Review the following code and provide specific, actionable feedback.

Code to review:
\`\`\`
${code}
\`\`\`

${customRequest ? `Specific focus: ${customRequest}\n` : ''}

Provide feedback in the following format:
- For each issue, specify: TYPE (info/warning/error/suggestion), MESSAGE, and optionally LINE number
- Be specific and actionable
- Focus on: code quality, best practices, potential bugs, performance, security, and maintainability

Format your response as:
TYPE|MESSAGE|LINE (optional)
TYPE|MESSAGE|LINE (optional)
...`;

    return basePrompt;
  }

  private buildContext(context: AgentContext): string {
    let ctx = `Workspace: ${context.workspacePath}`;
    if (context.currentFile) {
      ctx += `\nCurrent File: ${context.currentFile}`;
    }
    if (context.codebaseContext) {
      ctx += `\nCodebase Context: ${context.codebaseContext}`;
    }
    return ctx;
  }

  private parseAIResponse(aiResponse: string, code: string): AgentSuggestion[] {
    const suggestions: AgentSuggestion[] = [];
    const lines = code.split('\n');

    // Parse the AI response - looking for TYPE|MESSAGE|LINE format
    const responseLines = aiResponse.split('\n').filter(line => line.trim());
    
    for (const line of responseLines) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        const type = this.parseSuggestionType(parts[0]);
        const message = parts[1];
        const lineNumber = parts[2] ? parseInt(parts[2], 10) : undefined;

        suggestions.push({
          type,
          message,
          line: lineNumber && !isNaN(lineNumber) ? lineNumber - 1 : undefined, // Convert to 0-based
          priority: type === 'error' ? 1 : type === 'warning' ? 2 : 3
        });
      }
    }

    // If parsing failed, create a general suggestion
    if (suggestions.length === 0 && aiResponse.trim()) {
      suggestions.push({
        type: 'info',
        message: aiResponse,
        priority: 3
      });
    }

    return suggestions;
  }

  private parseSuggestionType(typeStr: string): 'info' | 'warning' | 'error' | 'suggestion' {
    const lower = typeStr.toLowerCase();
    if (lower.includes('error') || lower.includes('critical')) return 'error';
    if (lower.includes('warning') || lower.includes('caution')) return 'warning';
    if (lower.includes('suggestion') || lower.includes('improve')) return 'suggestion';
    return 'info';
  }
}

