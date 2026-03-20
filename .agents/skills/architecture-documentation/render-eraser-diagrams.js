#!/usr/bin/env node

/**
 * Eraser Diagram Renderer
 *
 * Extracts Eraser diagram code from markdown documentation and renders them via Eraser API.
 *
 * Usage:
 *   ./render-eraser-diagrams.js <markdown-file> [options]
 *
 * Options:
 *   --output-dir <dir>    Output directory for rendered diagrams (default: ./diagrams)
 *   --format <format>     Output format: svg or png (default: svg)
 *   --replace             Replace diagram code blocks with image references in markdown
 *   --api-key <key>       Eraser API key (or set ERASER_API_KEY env var)
 *
 * Example:
 *   ./render-eraser-diagrams.js Architecture.md --format svg --replace
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  markdownFile: args[0],
  outputDir: './diagrams',
  format: 'svg',
  replace: false,
  apiKey: process.env.ERASER_API_KEY || '',
};

// Parse options
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
    case '--api-key':
      options.apiKey = args[++i];
      break;
    case '--help':
      console.log(`
Eraser Diagram Renderer

Usage:
  ./render-eraser-diagrams.js <markdown-file> [options]

Options:
  --output-dir <dir>    Output directory for rendered diagrams (default: ./diagrams)
  --format <format>     Output format: svg or png (default: svg)
  --replace             Replace diagram code blocks with image references in markdown
  --api-key <key>       Eraser API key (or set ERASER_API_KEY env var)

Example:
  ./render-eraser-diagrams.js Architecture.md --format svg --replace
      `);
      process.exit(0);
  }
}

// Validate inputs
if (!options.markdownFile) {
  console.error('Error: Markdown file path required');
  console.error('Usage: ./render-eraser-diagrams.js <markdown-file> [options]');
  process.exit(1);
}

if (!fs.existsSync(options.markdownFile)) {
  console.error(`Error: File not found: ${options.markdownFile}`);
  process.exit(1);
}

// Create output directory
if (!fs.existsSync(options.outputDir)) {
  fs.mkdirSync(options.outputDir, { recursive: true });
}

/**
 * Extract Eraser diagram code blocks from markdown
 * @param {string} markdown - Markdown content
 * @returns {Array<{name: string, code: string, index: number}>} Array of diagram objects
 */
function extractDiagrams(markdown) {
  const diagrams = [];

  // Match code blocks that contain Eraser diagram comments
  const codeBlockRegex = /```(?:eraser)?\s*\n(\/\/\s*(?:Eraser\s*[Dd]iagram:?\s*)(.+?)\n)?([\s\S]*?)```/g;

  let match;
  let diagramIndex = 0;

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const fullMatch = match[0];
    const commentLine = match[1];
    const diagramName = match[2];
    const code = match[3].trim();

    // Check if this is actually an Eraser diagram (has typical syntax)
    if (code.match(/\[icon:|>|{|}|\[label:/)) {
      diagrams.push({
        name: diagramName ? diagramName.trim() : `diagram-${++diagramIndex}`,
        code: code,
        index: match.index,
        fullMatch: fullMatch,
      });
    }
  }

  return diagrams;
}

/**
 * Call Eraser API to render diagram
 * @param {string} diagramCode - Eraser diagram code
 * @param {string} format - Output format (svg or png)
 * @returns {Promise<Buffer>} Rendered diagram as buffer
 */
async function renderDiagram(diagramCode, format = 'svg') {
  // Note: This is a placeholder implementation
  // The actual Eraser API endpoint and authentication method should be confirmed
  // from Eraser's documentation (https://docs.eraser.io/docs/api)

  const apiEndpoint = 'api.eraser.io';
  const apiPath = '/api/render';

  const postData = JSON.stringify({
    diagram: diagramCode,
    format: format,
  });

  const requestOptions = {
    hostname: apiEndpoint,
    port: 443,
    path: apiPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': `Bearer ${options.apiKey}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      const chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const buffer = Buffer.concat(chunks);

        if (res.statusCode === 200) {
          resolve(buffer);
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${buffer.toString()}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Save diagram to file
 * @param {Buffer} buffer - Diagram data
 * @param {string} filename - Output filename
 */
function saveDiagram(buffer, filename) {
  const filepath = path.join(options.outputDir, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Saved: ${filepath}`);
  return filepath;
}

/**
 * Sanitize diagram name for filename
 * @param {string} name - Diagram name
 * @returns {string} Sanitized filename
 */
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Main execution
 */
async function main() {
  console.log('Eraser Diagram Renderer\n');
  console.log(`Reading: ${options.markdownFile}`);

  // Read markdown file
  const markdown = fs.readFileSync(options.markdownFile, 'utf8');

  // Extract diagrams
  const diagrams = extractDiagrams(markdown);

  if (diagrams.length === 0) {
    console.log('No Eraser diagrams found in markdown file.');
    return;
  }

  console.log(`Found ${diagrams.length} diagram(s)\n`);

  // Check for API key if rendering
  if (!options.apiKey) {
    console.warn('Warning: No Eraser API key provided.');
    console.warn('Set ERASER_API_KEY environment variable or use --api-key option.');
    console.warn('Saving diagram code to files instead...\n');

    // Save diagram code to files
    diagrams.forEach((diagram, index) => {
      const filename = `${sanitizeFilename(diagram.name)}.eraser`;
      const filepath = path.join(options.outputDir, filename);
      fs.writeFileSync(filepath, diagram.code);
      console.log(`✓ Saved code: ${filepath}`);
    });

    console.log('\nTo render diagrams, obtain an API key from https://eraser.io');
    return;
  }

  // Render diagrams
  let updatedMarkdown = markdown;
  const replacements = [];

  for (let i = 0; i < diagrams.length; i++) {
    const diagram = diagrams[i];
    const filename = `${sanitizeFilename(diagram.name)}.${options.format}`;

    console.log(`Rendering: ${diagram.name}...`);

    try {
      const buffer = await renderDiagram(diagram.code, options.format);
      const filepath = saveDiagram(buffer, filename);

      // Store replacement for later
      if (options.replace) {
        replacements.push({
          original: diagram.fullMatch,
          replacement: `![${diagram.name}](${path.relative(path.dirname(options.markdownFile), filepath)})`,
        });
      }
    } catch (error) {
      console.error(`✗ Error rendering ${diagram.name}: ${error.message}`);

      // Save code as fallback
      const codeFilename = `${sanitizeFilename(diagram.name)}.eraser`;
      const filepath = path.join(options.outputDir, codeFilename);
      fs.writeFileSync(filepath, diagram.code);
      console.log(`  ↳ Saved code instead: ${filepath}`);
    }
  }

  // Replace diagram code with image references if requested
  if (options.replace && replacements.length > 0) {
    console.log('\nReplacing diagram code with image references...');

    replacements.forEach(({ original, replacement }) => {
      updatedMarkdown = updatedMarkdown.replace(original, replacement);
    });

    // Write updated markdown
    const outputFilename = options.markdownFile.replace(/\.md$/, '-with-images.md');
    fs.writeFileSync(outputFilename, updatedMarkdown);
    console.log(`✓ Updated markdown saved: ${outputFilename}`);
  }

  console.log('\nDone!');
}

// Run main function
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
