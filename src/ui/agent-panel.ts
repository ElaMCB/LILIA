/**
 * Agent Panel UI Component
 * Shows active agents and their status
 */

import * as vscode from 'vscode';
import { AgentManager } from '../agents/manager';
import { IAgent } from '../types/agent';

export class AgentPanel {
  private panel: vscode.WebviewPanel | undefined;
  private agentManager: AgentManager;

  constructor(agentManager: AgentManager) {
    this.agentManager = agentManager;
  }

  public show(context: vscode.ExtensionContext): void {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'liliaAgentPanel',
      'LILIA Agents',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    this.panel.webview.html = this.getHtml(this.agentManager.getAllAgents());
    
    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });

    // Update panel when agents change
    this.panel.webview.onDidReceiveMessage(
      message => {
        if (message.command === 'refresh') {
          this.updateContent();
        }
      },
      undefined,
      context.subscriptions
    );
  }

  public updateContent(): void {
    if (this.panel) {
      this.panel.webview.html = this.getHtml(this.agentManager.getAllAgents());
    }
  }

  private getHtml(agents: IAgent[]): string {
    const agentsHtml = agents.map(agent => `
      <div class="agent-item">
        <div class="agent-header">
          <h3>${agent.name}</h3>
          <span class="agent-status active">Active</span>
        </div>
        <p class="agent-description">${agent.description}</p>
        <div class="agent-capabilities">
          <strong>Capabilities:</strong>
          <ul>
            ${agent.capabilities.map(cap => `<li>${cap.name}: ${cap.description}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LILIA Agents</title>
  <style>
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      padding: 20px;
      background-color: var(--vscode-editor-background);
    }
    .agent-item {
      border: 1px solid var(--vscode-panel-border);
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 15px;
      background-color: var(--vscode-editor-background);
    }
    .agent-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .agent-header h3 {
      margin: 0;
      color: var(--vscode-textLink-foreground);
    }
    .agent-status {
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: bold;
    }
    .agent-status.active {
      background-color: var(--vscode-testing-iconPassed);
      color: white;
    }
    .agent-description {
      color: var(--vscode-descriptionForeground);
      margin: 10px 0;
    }
    .agent-capabilities {
      margin-top: 10px;
      font-size: 13px;
    }
    .agent-capabilities ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    .agent-capabilities li {
      margin: 5px 0;
    }
    button {
      background-color: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 8px 16px;
      border-radius: 3px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background-color: var(--vscode-button-hoverBackground);
    }
  </style>
</head>
<body>
  <h1>🤖 LILIA Agent System</h1>
  <p>Active Agents: ${agents.length}</p>
  <button onclick="refresh()">Refresh</button>
  <div class="agents-list">
    ${agentsHtml || '<p>No agents registered.</p>'}
  </div>
  <script>
    const vscode = acquireVsCodeApi();
    function refresh() {
      vscode.postMessage({ command: 'refresh' });
    }
  </script>
</body>
</html>`;
  }

  public dispose(): void {
    if (this.panel) {
      this.panel.dispose();
    }
  }
}


