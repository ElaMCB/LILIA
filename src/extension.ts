/**
 * LILIA Extension - Main Entry Point
 * Your Custom AI IDE with Agent System
 */

import * as vscode from 'vscode';
import { AgentManager } from './agents/manager';
import { AgentPanel } from './ui/agent-panel';
import { AgentContext } from './types/agent';
import { readFileContent, getWorkspacePath, getRelativePath } from './utils/file-reader';

let agentManager: AgentManager;
let agentPanel: AgentPanel;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  console.log('LILIA extension is now active!');

  // Initialize agent system
  const config = vscode.workspace.getConfiguration('lilia');
  agentManager = new AgentManager(config);
  agentPanel = new AgentPanel(agentManager);

  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = '$(robot) LILIA';
  statusBarItem.tooltip = 'LILIA Agent System - Click to open agent panel';
  statusBarItem.command = 'lilia.agentPanel';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register commands
  const commands = [
    vscode.commands.registerCommand('lilia.agentPanel', () => {
      agentPanel.show(context);
    }),

    vscode.commands.registerCommand('lilia.codeReview', async () => {
      await handleCodeReview();
    }),

    vscode.commands.registerCommand('lilia.codeReviewSelection', async () => {
      await handleCodeReviewSelection();
    }),

    vscode.commands.registerCommand('lilia.generateTests', async () => {
      vscode.window.showInformationMessage('Test Generator Agent - Coming soon!');
    }),

    vscode.commands.registerCommand('lilia.securityScan', async () => {
      vscode.window.showInformationMessage('Security Agent - Coming soon!');
    }),

    vscode.commands.registerCommand('lilia.documentationGenerate', async () => {
      vscode.window.showInformationMessage('Documentation Agent - Coming soon!');
    }),

    vscode.commands.registerCommand('lilia.agentChat', async () => {
      await handleAgentChat();
    })
  ];

  context.subscriptions.push(...commands);

  // Watch for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('lilia')) {
        const newConfig = vscode.workspace.getConfiguration('lilia');
        agentManager.updateConfig(newConfig);
        agentPanel.updateContent();
        vscode.window.showInformationMessage('LILIA configuration updated');
      }
    })
  );

  // Show welcome message
  vscode.window.showInformationMessage('LILIA Agent System activated! Use Command Palette to interact with agents.');
}

async function handleCodeReview(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor. Please open a file first.');
    return;
  }

  const document = editor.document;
  const filePath = document.uri.fsPath;
  const workspacePath = getWorkspacePath();

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Code Review Agent',
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Reading file...' });
      
      const fileContent = await readFileContent(filePath);
      
      progress.report({ increment: 30, message: 'Analyzing code...' });

      const context: AgentContext = {
        workspacePath: workspacePath || '',
        currentFile: filePath,
        selectedText: fileContent,
        codebaseContext: `File: ${getRelativePath(filePath)}`
      };

      const response = await agentManager.requestAgent('codeReview', context);
      
      progress.report({ increment: 100, message: 'Review complete!' });

      if (response.success) {
        showReviewResults(response, editor);
      } else {
        vscode.window.showErrorMessage(`Code review failed: ${response.message}`);
      }
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error: ${error.message}`);
  }
}

async function handleCodeReviewSelection(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor. Please open a file first.');
    return;
  }

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showWarningMessage('Please select some code to review.');
    return;
  }

  const selectedText = editor.document.getText(selection);
  const filePath = editor.document.uri.fsPath;
  const workspacePath = getWorkspacePath();

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Code Review Agent',
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Reviewing selection...' });
      
      const context: AgentContext = {
        workspacePath: workspacePath || '',
        currentFile: filePath,
        selectedText: selectedText,
        codebaseContext: `File: ${getRelativePath(filePath)}, Selection: lines ${selection.start.line + 1}-${selection.end.line + 1}`
      };

      const response = await agentManager.requestAgent('codeReview', context);
      
      progress.report({ increment: 100, message: 'Review complete!' });

      if (response.success) {
        showReviewResults(response, editor);
      } else {
        vscode.window.showErrorMessage(`Code review failed: ${response.message}`);
      }
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error: ${error.message}`);
  }
}

function showReviewResults(response: any, editor: vscode.TextEditor): void {
  const suggestions = response.suggestions || [];
  
  if (suggestions.length === 0) {
    vscode.window.showInformationMessage(response.message || 'Code review completed. No suggestions.');
    return;
  }

  // Show results in output channel
  const outputChannel = vscode.window.createOutputChannel('LILIA Code Review');
  outputChannel.clear();
  outputChannel.appendLine('=== Code Review Results ===\n');
  outputChannel.appendLine(response.message);
  outputChannel.appendLine('');

  suggestions.forEach((suggestion: any, index: number) => {
    outputChannel.appendLine(`${index + 1}. [${suggestion.type.toUpperCase()}] ${suggestion.message}`);
    if (suggestion.line !== undefined) {
      outputChannel.appendLine(`   Line: ${suggestion.line + 1}`);
    }
    outputChannel.appendLine('');
  });

  outputChannel.show();

  // Show summary
  const errorCount = suggestions.filter((s: any) => s.type === 'error').length;
  const warningCount = suggestions.filter((s: any) => s.type === 'warning').length;
  const infoCount = suggestions.filter((s: any) => s.type === 'info' || s.type === 'suggestion').length;

  const summary = `Review complete: ${errorCount} error(s), ${warningCount} warning(s), ${infoCount} suggestion(s)`;
  vscode.window.showInformationMessage(summary, 'View Details').then(selection => {
    if (selection === 'View Details') {
      outputChannel.show();
    }
  });

  // Create diagnostics for editor
  const diagnostics: vscode.Diagnostic[] = suggestions
    .filter((s: any) => s.line !== undefined)
    .map((suggestion: any) => {
      const line = suggestion.line || 0;
      const range = new vscode.Range(line, 0, line, 1000);
      
      let severity: vscode.DiagnosticSeverity;
      switch (suggestion.type) {
        case 'error':
          severity = vscode.DiagnosticSeverity.Error;
          break;
        case 'warning':
          severity = vscode.DiagnosticSeverity.Warning;
          break;
        default:
          severity = vscode.DiagnosticSeverity.Information;
      }

      return new vscode.Diagnostic(range, suggestion.message, severity);
    });

  const diagnosticCollection = vscode.languages.createDiagnosticCollection('lilia');
  diagnosticCollection.set(editor.document.uri, diagnostics);
}

async function handleAgentChat(): Promise<void> {
  const agents = agentManager.getAllAgents();
  
  if (agents.length === 0) {
    vscode.window.showWarningMessage('No agents available.');
    return;
  }

  const agentItems = agents.map(agent => ({
    label: agent.name,
    description: agent.description,
    id: agent.id
  }));

  const selected = await vscode.window.showQuickPick(agentItems, {
    placeHolder: 'Select an agent to chat with...'
  });

  if (!selected) {
    return;
  }

  const question = await vscode.window.showInputBox({
    placeHolder: 'Ask the agent a question...',
    prompt: `Chatting with ${selected.label}`
  });

  if (!question) {
    return;
  }

  const workspacePath = getWorkspacePath();
  const editor = vscode.window.activeTextEditor;
  
  const context: AgentContext = {
    workspacePath: workspacePath || '',
    currentFile: editor?.document.uri.fsPath,
    selectedText: editor?.document.getText(editor.selection),
    codebaseContext: workspacePath ? `Workspace: ${workspacePath}` : undefined
  };

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `${selected.label}`,
      cancellable: false
    }, async (progress) => {
      progress.report({ increment: 0, message: 'Processing...' });
      
      const response = await agentManager.requestAgent(selected.id, context, question);
      
      progress.report({ increment: 100 });

      if (response.success) {
        vscode.window.showInformationMessage(response.message);
        if (response.suggestions && response.suggestions.length > 0) {
          const outputChannel = vscode.window.createOutputChannel(`LILIA - ${selected.label}`);
          outputChannel.clear();
          outputChannel.appendLine(response.message);
          response.suggestions.forEach((s: any) => {
            outputChannel.appendLine(`\n[${s.type}] ${s.message}`);
          });
          outputChannel.show();
        }
      } else {
        vscode.window.showErrorMessage(`Agent error: ${response.message}`);
      }
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error: ${error.message}`);
  }
}

export function deactivate() {
  if (agentPanel) {
    agentPanel.dispose();
  }
  statusBarItem.dispose();
}


