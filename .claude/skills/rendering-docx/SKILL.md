---
name: rendering-docx
description: Use when architecture documentation needs to be delivered as a Word document, stakeholders request formal .docx artifacts instead of markdown, or compliance/audit requires rendered diagrams embedded in Word format
---

# Rendering Architecture Docs to DOCX

Converts architecture markdown with diagram code blocks into a polished Word document. Diagrams render via Kroki API and embed as PNG images. Supports any Kroki-supported diagram type (PlantUML, C4, Mermaid, D2, Graphviz, etc.).

**Requires network access** to reach `kroki.io` (or a local Kroki instance) for diagram rendering. Documents without diagrams render fully offline.

All paths below use `$SKILL_DIR` as shorthand for this skill's directory (the directory containing this SKILL.md file). Resolve it once from the path used to read this file, then substitute the absolute path directly into each command — shell variables do not persist between tool calls.

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Verify dependencies
- [ ] Step 2: Run the render script
- [ ] Step 3: Verify output
- [ ] Step 4: Deliver to user
```

**Step 1: Verify dependencies**

```bash
pip install -r "$SKILL_DIR/scripts/requirements.txt"
```

Requires: `python-docx>=1.1.0`, `requests>=2.31.0`, `mistune>=3.0.0`, `Pillow>=10.0.0`

**Step 2: Run the render script**

```bash
python3 "$SKILL_DIR/scripts/render-docx.py" <input.md> [-o output.docx]
```

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output` | Output DOCX path | `<input>.docx` |
| `--kroki-url` | Kroki instance URL | `https://kroki.io` |
| `--image-width` | Max image width (inches) | `6.0` |
| `--template` | Corporate `.dotx` template | None |

**Step 3: Verify output**

Run this programmatic check on the generated DOCX:

```bash
python3 -c "
from docx import Document
import sys
d = Document(sys.argv[1])
imgs = len(d.inline_shapes)
tables = len(d.tables)
headings = len([p for p in d.paragraphs if p.style.name.startswith('Heading')])
print(f'Headings: {headings}, Tables: {tables}, Images: {imgs}, Size: {len(d.paragraphs)} paragraphs')
" <output.docx>
```

Check: images > 0 (if source had diagrams), tables > 0 (if source had tables), headings > 0. Report any zeros to the user as a potential issue. Remind user to right-click TOC and select Update Field in Word.

**Step 4: Deliver**

Report the output path, file size, and verification counts to the user.

## Error Recovery

**Kroki render error (400/422):** The failing diagram type and error are printed. Check the diagram syntax. C4 diagrams must have `!include <C4/...>` or use the `c4plantuml` fence tag — otherwise they route to the wrong Kroki endpoint. Note: Kroki bundles specific renderer versions — bleeding-edge syntax may not be supported.

**Connection error (cannot reach kroki.io):** Either the network is down, blocked, or the service is unavailable. Self-host Kroki locally. For documents with Mermaid diagrams, a single container is not enough — use docker-compose:

```yaml
# docker-compose.yml
services:
  kroki:
    image: yuzutech/kroki
    ports: ["8000:8000"]
    environment:
      KROKI_MERMAID_HOST: mermaid
  mermaid:
    image: yuzutech/kroki-mermaid
    expose: ["8002"]
```

```bash
docker-compose up -d
python3 "$SKILL_DIR/scripts/render-docx.py" doc.md --kroki-url http://localhost:8000
```

For PlantUML-only documents, `docker run -p8000:8000 yuzutech/kroki` suffices.

**Rate limited (429/503):** Same self-hosting fix as above.

**Missing tables in output:** The script enables mistune's table plugin automatically. If tables still appear as plain text: (1) verify markdown has the alignment row `|---|---|`, (2) verify mistune version: `pip show mistune` should show `>=3.0.0`.

## Key Behaviors

**C4 routing:** Diagrams with C4 markers (`!include <C4/...>`, `C4_Context`, `C4_Container`) route to `/c4plantuml/png`, not `/plantuml/png`. Tag fence blocks `c4plantuml` to force this.

**Untagged PlantUML:** Code blocks without a fence tag but containing `@startuml` are auto-detected.

**Figure captions** follow this priority:

| Priority | Source | Example |
|----------|--------|---------|
| 1 | HTML comment `<!-- caption: ... -->` | `<!-- caption: System Context -->` |
| 2 | PlantUML name `@startuml Name` | `@startuml System Context` |
| 3 | Preceding heading | `### System Architecture` |
| 4 | Fallback | `Diagram 1`, `Diagram 2`, ... |

**Page breaks:** `---` (thematic break) in markdown inserts a page break in the DOCX.

**Document structure:** Title page (from first H1) → Table of Contents → Body with headings, formatted text, rendered diagrams, tables, lists, block quotes, and code blocks.

**Template support:** Pass `--template corporate.dotx` to apply corporate styles. The script adds Figure Caption and Code Block styles only if absent from the template.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| C4 diagram renders incorrectly | Ensure `!include <C4/...>` is present or tag as `c4plantuml` |
| Images too wide/small | Adjust `--image-width` (default 6.0 inches) |
| TOC is empty in Word | Right-click TOC → Update Field → Update Entire Table |
| Mermaid fails on local Kroki | Need `kroki-mermaid` companion container (see Error Recovery) |
