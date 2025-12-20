/**
 * Agent Memory System
 * Stores context and learning data for agents
 */

import { AgentMemory } from '../types/agent';

export class SimpleAgentMemory implements AgentMemory {
  private storage: Map<string, any> = new Map();
  private maxSize: number = 1000;

  store(key: string, value: any): void {
    // Simple LRU eviction if needed
    if (this.storage.size >= this.maxSize) {
      const firstKey = this.storage.keys().next().value;
      this.storage.delete(firstKey);
    }
    this.storage.set(key, value);
  }

  retrieve(key: string): any {
    return this.storage.get(key);
  }

  clear(): void {
    this.storage.clear();
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    this.storage.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  delete(key: string): void {
    this.storage.delete(key);
  }
}


