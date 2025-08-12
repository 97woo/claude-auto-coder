#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// MCP Server for Claude Auto Coder
class AutoCoderMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'claude-auto-coder-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'create_file',
          description: 'Create a new file with content',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'File path relative to project root',
              },
              content: {
                type: 'string',
                description: 'File content',
              },
            },
            required: ['path', 'content'],
          },
        },
        {
          name: 'edit_file',
          description: 'Edit an existing file',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'File path relative to project root',
              },
              content: {
                type: 'string',
                description: 'New file content',
              },
            },
            required: ['path', 'content'],
          },
        },
        {
          name: 'read_file',
          description: 'Read a file',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'File path relative to project root',
              },
            },
            required: ['path'],
          },
        },
        {
          name: 'list_files',
          description: 'List files in a directory',
          inputSchema: {
            type: 'object',
            properties: {
              directory: {
                type: 'string',
                description: 'Directory path relative to project root',
              },
            },
            required: ['directory'],
          },
        },
        {
          name: 'run_command',
          description: 'Run a shell command',
          inputSchema: {
            type: 'object',
            properties: {
              command: {
                type: 'string',
                description: 'Shell command to execute',
              },
            },
            required: ['command'],
          },
        },
        {
          name: 'git_commit',
          description: 'Create a git commit',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Commit message',
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'create_pr',
          description: 'Create a GitHub pull request',
          inputSchema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'PR title',
              },
              body: {
                type: 'string',
                description: 'PR description',
              },
              branch: {
                type: 'string',
                description: 'Branch name',
              },
            },
            required: ['title', 'body', 'branch'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_file':
            return await this.createFile(args.path, args.content);
          
          case 'edit_file':
            return await this.editFile(args.path, args.content);
          
          case 'read_file':
            return await this.readFile(args.path);
          
          case 'list_files':
            return await this.listFiles(args.directory);
          
          case 'run_command':
            return await this.runCommand(args.command);
          
          case 'git_commit':
            return await this.gitCommit(args.message);
          
          case 'create_pr':
            return await this.createPR(args.title, args.body, args.branch);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async createFile(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf8');
    
    return {
      content: [
        {
          type: 'text',
          text: `File created: ${filePath}`,
        },
      ],
    };
  }

  async editFile(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.writeFile(fullPath, content, 'utf8');
    
    return {
      content: [
        {
          type: 'text',
          text: `File edited: ${filePath}`,
        },
      ],
    };
  }

  async readFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async listFiles(directory) {
    const fullPath = path.join(process.cwd(), directory);
    const files = await fs.readdir(fullPath);
    
    return {
      content: [
        {
          type: 'text',
          text: files.join('\n'),
        },
      ],
    };
  }

  async runCommand(command) {
    const { stdout, stderr } = await execAsync(command);
    
    return {
      content: [
        {
          type: 'text',
          text: stdout || stderr,
        },
      ],
    };
  }

  async gitCommit(message) {
    await execAsync('git add -A');
    await execAsync(`git commit -m "${message}"`);
    
    return {
      content: [
        {
          type: 'text',
          text: `Committed with message: ${message}`,
        },
      ],
    };
  }

  async createPR(title, body, branch) {
    // Use GitHub CLI or Octokit
    const { stdout } = await execAsync(
      `gh pr create --title "${title}" --body "${body}" --base main --head ${branch}`
    );
    
    return {
      content: [
        {
          type: 'text',
          text: `PR created: ${stdout}`,
        },
      ],
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Server started');
  }
}

// Start the server
const server = new AutoCoderMCPServer();
server.start().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});