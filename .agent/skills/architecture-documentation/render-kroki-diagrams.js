#!/usr/bin/env node

/**
 * Architecture docs typically embed 5-10 diagrams per file across PlantUML
 * and Mermaid. Manually copy-pasting each into Kroki's web UI is tedious.
 * This script extracts all PlantUML and Mermaid blocks from a markdown file
 * and renders them in batch via the Kroki REST API.
 *
 * Routing logic:
 *   - C4 PlantUML (includes C4/ headers) → /c4plantuml/ endpoint
 *   - Regular PlantUML → /plantuml/ endpoint
 *   - Mermaid → /mermaid/ endpoint
 *
 * Falls back to saving raw source files (.puml/.mmd) when the API is
 * unreachable. Note: Kroki's Mermaid support requires the kroki-mermaid
 * companion container when self-hosting (see docker-compose in mermaid-syntax.md).
 *
 * Usage:
 *   ./render-kroki-diagrams.js <markdown-file> [options]
 *
 * Options:
 *   --output-dir <dir>    Output directory for rendered diagrams (default: ./diagrams)
 *   --format <format>     Output format: svg or png (default: svg)
 *   --replace             Replace diagram code blocks with image references in markdown
 *   --base-url <url>      Kroki instance URL (default: https://kroki.io)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const args = process.argv.slice(2);
const options = {
  markdownFile: args[0],
  outputDir: './diagrams',
  format: 'svg',
  replace: false,
  baseUrl: 'https://kroki.io',
};

for (let i = 1; i < args.length; i++) {
  switch (args[i]) {
    case '--output-dir':
      options.outputDir = args[++i];
      break;
    case '--format':
      options.format = args[++i];
      break;
    case '--replace':
      options.replace = true;
      break;
    case '--base-url':
      options.baseUrl = args[++i];
      break;
    case '--help':
      console.log(`
Kroki Diagram Renderer

Extracts PlantUML and Mermaid diagrams from markdown and renders them via Kroki API.

Usage:
  ./render-kroki-diagrams.js <markdown-file> [options]

Options:
  --output-dir <dir>    Output directory for rendered diagrams (default: ./diagrams)
  --format <format>     Output format: svg or png (default: svg)
  --replace             Replace diagram code blocks with image references in markdown
  --base-url <url>      Kroki instance URL (default: https://kroki.io)

Supported diagram types:
  - PlantUML (```plantuml or bare ``` with @startuml/@enduml)
  - C4 PlantUML (auto-detected, routed to /c4plantuml/)
  - Mermaid (```mermaid fences)

Examples:
  ./render-kroki-diagrams.js Architecture.md
  ./render-kroki-diagrams.js Architecture.md --format png --replace
  ./render-kroki-diagrams.js Architecture.md --base-url http://localhost:8000
      `);
      process.exit(0);
  }
}

if (!options.markdownFile) {
  console.error('Error: Markdown file path required');
  console.error('Usage: ./render-kroki-diagrams.js <markdown-file> [options]');
  process.exit(1);
}

if (!fs.existsSync(options.markdownFile)) {
  console.error(`Error: File not found: ${options.markdownFile}`);
  process.exit(1);
}

if (!fs.existsSync(options.outputDir)) {
  fs.mkdirSync(options.outputDir, { recursive: true });
}

function extractDiagrams(markdown) {
  const diagrams = [];
  let diagramIndex = 0;

  // Extract PlantUML blocks (@startuml/@enduml inside ```plantuml or bare ``` fences)
  const plantumlRegex = /```(?:plantuml)?\s*\n([\s\S]*?@startuml[\s\S]*?@enduml[\s\S]*?)```/g;
  let match;

  while ((match = plantumlRegex.exec(markdown)) !== null) {
    const code = match[1].trim();
    const nameMatch = code.match(/@startuml\s+(.+)/);
    const commentMatch = code.match(/'\s*(?:Kroki|PlantUML)\s*(?:diagram)?:?\s*(.+)/i);
    const diagramName = nameMatch ? nameMatch[1].trim() :
                        commentMatch ? commentMatch[1].trim() :
                        `diagram-${++diagramIndex}`;

    const isC4 = code.includes('!include <C4/') ||
                 code.includes('C4_Context') ||
                 code.includes('C4_Container') ||
                 code.includes('C4_Component') ||
                 code.includes('C4_Deployment');

    diagrams.push({
      name: diagramName,
      code: code,
      fullMatch: match[0],
      diagramType: isC4 ? 'c4plantuml' : 'plantuml',
      sourceExt: 'puml',
    });
  }

  // Extract Mermaid blocks (```mermaid fences)
  const mermaidRegex = /```mermaid\s*\n([\s\S]*?)```/g;

  while ((match = mermaidRegex.exec(markdown)) !== null) {
    const code = match[1].trim();
    // Derive name from first meaningful keyword or comment
    const commentMatch = code.match(/%%\s*(.+)/);
    const titleMatch = code.match(/title\s+(.+)/);
    const diagramName = commentMatch ? commentMatch[1].trim() :
                        titleMatch ? titleMatch[1].trim() :
                        `mermaid-${++diagramIndex}`;

    diagrams.push({
      name: diagramName,
      code: code,
      fullMatch: match[0],
      diagramType: 'mermaid',
      sourceExt: 'mmd',
    });
  }

  return diagrams;
}

function renderDiagram(diagramCode, diagramType, format) {
  const url = new URL(`/${diagramType}/${format}`, options.baseUrl);
  const client = url.protocol === 'https:' ? https : http;

  const requestOptions = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(diagramCode, 'utf8'),
    },
  };

  return new Promise((resolve, reject) => {
    const req = client.request(requestOptions, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (res.statusCode === 200) {
          resolve(buffer);
        } else {
          reject(new Error(`Kroki API returned ${res.statusCode}: ${buffer.toString().slice(0, 200)}`));
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.write(diagramCode, 'utf8');
    req.end();
  });
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('Kroki Diagram Renderer\n');
  console.log(`Reading: ${options.markdownFile}`);
  console.log(`Kroki URL: ${options.baseUrl}\n`);

  const markdown = fs.readFileSync(options.markdownFile, 'utf8');
  const diagrams = extractDiagrams(markdown);

  if (diagrams.length === 0) {
    console.log('No diagrams found in markdown file.');
    console.log('PlantUML: wrap in @startuml/@enduml within ```plantuml fences.');
    console.log('Mermaid: use ```mermaid fences.');
    return;
  }

  console.log(`Found ${diagrams.length} diagram(s)\n`);

  let updatedMarkdown = markdown;
  const replacements = [];

  for (let i = 0; i < diagrams.length; i++) {
    const diagram = diagrams[i];
    const filename = `${sanitizeFilename(diagram.name)}.${options.format}`;

    console.log(`[${i + 1}/${diagrams.length}] Rendering: ${diagram.name} (${diagram.diagramType})...`);

    try {
      const buffer = await renderDiagram(diagram.code, diagram.diagramType, options.format);
      const filepath = path.join(options.outputDir, filename);
      fs.writeFileSync(filepath, buffer);
      console.log(`  -> Saved: ${filepath}`);

      if (options.replace) {
        replacements.push({
          original: diagram.fullMatch,
          replacement: `![${diagram.name}](${path.relative(path.dirname(options.markdownFile), filepath)})`,
        });
      }
    } catch (error) {
      console.error(`  -> Error: ${error.message}`);

      const sourceFilename = `${sanitizeFilename(diagram.name)}.${diagram.sourceExt || 'puml'}`;
      const filepath = path.join(options.outputDir, sourceFilename);
      fs.writeFileSync(filepath, diagram.code);
      console.log(`  -> Saved source: ${filepath}`);
    }
  }

  if (options.replace && replacements.length > 0) {
    console.log('\nReplacing diagram code with image references...');
    replacements.forEach(({ original, replacement }) => {
      updatedMarkdown = updatedMarkdown.replace(original, replacement);
    });
    const outputFilename = options.markdownFile.replace(/\.md$/, '-with-images.md');
    fs.writeFileSync(outputFilename, updatedMarkdown);
    console.log(`Saved: ${outputFilename}`);
  }

  console.log('\nDone!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
