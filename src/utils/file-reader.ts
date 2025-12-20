/**
 * Utility for reading files from VS Code workspace
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function readFileContent(filePath: string): Promise<string> {
  try {
    const document = await vscode.workspace.openTextDocument(filePath);
    return document.getText();
  } catch (error) {
    // Fallback to filesystem if document can't be opened
    return fs.readFileSync(filePath, 'utf-8');
  }
}

export function getWorkspacePath(): string | undefined {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    return workspaceFolders[0].uri.fsPath;
  }
  return undefined;
}

export function getRelativePath(filePath: string): string {
  const workspacePath = getWorkspacePath();
  if (workspacePath && filePath.startsWith(workspacePath)) {
    return path.relative(workspacePath, filePath);
  }
  return filePath;
}


