---
name: human-writing-style
description: Use when generating any written content (essays, legal arguments, discussion posts, docs, reports) to write in Triet's personal voice and style. Triggers include requests like "write this for me", "make this sound like me", "draft an essay", "rewrite in my style", or any content generation where matching Triet's writing patterns matters.
---

# Human Writing Style

## Overview

This skill produces writing that matches Triet's personal voice, tone, and patterns. It uses an extracted style profile built from 20 real writing samples across essays, legal analysis, advocacy letters, technical documentation, project reports, peer evaluations, science journalism, annotated bibliographies, and discussion posts.

## When to Use This Skill

- Generating any written content (essays, legal arguments, discussion posts, reports)
- Rewriting existing content to match Triet's voice
- User asks for "natural", "human", "my style", or "write like me"
- Content feels generic, robotic, or doesn't sound like Triet after a first pass

## Workflow

### Step 1: Load the Style Profile

Read `triet-writing-profile.md` in this skill's directory. This is the primary reference containing all extracted patterns, signature words, sentence structures, and real examples organized by category.

### Step 2: Identify the Genre

Determine what type of content is being written, then calibrate register:

| Genre | Register | Key Profile Sections |
|-------|----------|---------------------|
| Academic essay | Reflective, opinionated, conversational. Uses "I" freely. | Sections 1, 3, 4, 6, 7 |
| Technical essay | Explanatory, casual grounders ("basically", "pretty complex"). | Sections 4, 5, 6, 12 |
| Legal analysis | Assertive, methodical, evidence-heavy. "We will argue" team voice. | Sections 2, 3, 5, 8, 9 |
| Discussion post / peer response | Warm validation first, then own analysis, then confirmation. | Section 1 (Peer discussion mode), Section 3 (Dual-framework validation) |
| Advocacy / formal letter | Formal, respectful, research-backed. Personal credibility early. | Sections 2, 9, 12 |
| Research / process write-up | Descriptive, chronological, honest about learning curve. | Section 8 (Process narration) |
| Cross-examination / tactical | Direct, parenthetical strategy notes. | Section 2 (Tone by context) |
| Project report / reflection | Sprint-by-sprint narration, lessons-learned, future recommendations. | Sections 8, 12 |
| Peer evaluation | Blunt, evidence-based, grade-justified. No padding. | Sections 1, 12 |
| Product pitch / requirements | Gap identification, feature lists, priority frameworks. | Sections 3, 12 |
| Annotated bibliography | Source-then-explain, "I chose this source because...", synthesis evolution. | Sections 9, 12 |
| Science journalism | "Imagine..." hooks, technical-to-accessible translation, analogy-heavy. | Sections 7, 12 |
| Quiz / exam responses | Conversational-academic blend, concept explanation as if to a peer. | Sections 1, 6 |
| Issue / audience analysis | Controversy framing, audience profiling, explicit rhetorical strategy. | Sections 3, 7, 9, 12 |
| Technical documentation | Feature lists, priority frameworks, technology justifications. | Sections 8, 12 |
| Company report / deliverable | Impersonal or "we" voice (not "I"), findings-first, recommendation-close. Use Triet's transitions and sentence patterns but suppress first-person opinions. | Sections 4, 5, 8, 12 |

### Step 3: Genre-Specific Deep Dive (Optional)

If the profile doesn't provide enough depth for the specific genre, check `source-index.md` in this directory. It maps each genre to original source files that can be read for deeper immersion in that register.

### Step 4: Write Using These Rules

#### Voice
- Default to confident-casual. Opinionated but fair.
- Use "I believe" / "My opinion is" without apology.
- Use "definitely" naturally (Triet's most frequent intensifier).
- Use "Effectively" as a summative transition.
- Use "Given that" as a logical pivot.

#### Structure
- Open paragraphs with context/framing before the argument.
- Follow: Context > Claim > Evidence > Concession > Rebuttal > Reinforcement.
- When using ethical/legal frameworks, apply dual-framework validation (if two frameworks agree, the conclusion is confirmed).
- Close with a strong, concise statement.

#### Sentences
- Favor medium-long compound-complex sentences.
- Use parenthetical asides for precision: "which is one of the most critical tasks".
- End buildup sequences with a short punchy closer.
- Use dash-separated elaboration: "things like X, Y, and Z".

#### Transitions
- Heavy logical connectors: "Furthermore", "However", "Therefore", "In addition to".
- "Effectively" to summarize. "Whereas" for parallel contrast.
- "This then leads to..." for cascading consequences.
- "To reiterate..." / "Essentially, it all comes down to..." for summation.

#### Signature Phrases (Use Naturally, Don't Force)
- "definitely" — sprinkle where emphasis is needed
- "basically" — to ground technical explanations casually
- "pretty [adj]" — casual downtoner in technical contexts ("pretty complex")
- "This directly [verb]..." — for impact claims
- "What's [adjective] here is..." — to highlight key points
- "What makes X [adj] is..." — to emphasize uniqueness
- "The fact is..." — to anchor a core claim
- "rather than" — to reframe alternatives
- "Overall, I..." — for reflective closers
- "Looking back at..." — for retrospective openings
- "In addition with..." — unique quirk (not "In addition to")

#### Authentic Markers (Preserve, Don't "Fix")
- Occasional "Which" fragments after periods
- "meanwhile" as a mid-sentence pivot
- "as to whether" constructions
- "In addition with" instead of "In addition to"
- "softwares" as plural
- "along with" gerund chains ("along with documenting...")
- Stacked positive adjectives in peer contexts ("very interesting and quite relatable")

### Step 5: Self-Audit (Mandatory)

After writing, check EVERY item before outputting. If any fails, fix it.

| Check | Pass? |
|-------|-------|
| Does "definitely" appear at least once (if 500+ words)? | |
| Are there any one-sentence paragraphs? If yes, merge or expand them. | |
| Does every paragraph have 2+ sentences? | |
| Count signature markers — is density below 1 per 100 words? | |
| Scan for banned words and AI anti-patterns (Section 13 of profile). | |
| Does the opening avoid "Let's explore" / "In this essay"? | |
| Does the closing avoid "In summary" / "To wrap up"? | |
| Are there any rhetorical setups like "The question is..." followed by a one-line answer? Remove them. | |
| Read the first sentence of each paragraph — do they sound like press releases? Rewrite. | |

## Anti-Patterns (Never Do This)

These phrases are ABSENT from all 20 of Triet's writing samples. If they appear in output, it doesn't sound like Triet:

- "Let's dive into..." / "Let's explore..." / "Let's break down..."
- "It's worth noting..." / "It is worth noting..."
- "In summary" (use "In conclusion" or "Overall" instead)
- "This is because" as a sentence opener
- "In other words" / "That being said" / "That said" / "On the other hand"
- "Notably" as a sentence opener / "It should be noted"
- One-sentence dramatic paragraphs — Triet never does this. Examples of violations to catch:
  - `"The answer is yes."` as its own paragraph
  - `"This is the opening."` as its own paragraph
  - `"And that changes everything."` as its own paragraph
  - **Fix:** Merge into the surrounding paragraph or expand to 2+ sentences.
- Rhetorical question-answer setups: `"The question becomes whether..."` followed by `"The answer is [yes/no]."` — Triet states conclusions directly without theatrical buildup.
- Em-dashes for dramatic pauses (Triet uses dashes for elaboration lists, not drama)
- "Here's what stood out most:" / "Here's the thing:" — generic conversational filler absent from Triet's writing
- Excessive passive voice (Triet defaults to active with "I" and named subjects)

## Paragraph Structure

- Default paragraph: **3-5 sentences** (essays/legal), **2-3 sentences** (discussion posts), **2-4 sentences** (reports/letters)
- One-sentence paragraphs are extremely rare (< 5%). Never for dramatic emphasis.
- Introduction paragraphs tend longer (4-5 sentences). Body paragraphs 3-4.
- Open documents with **broad contextual assertions**, **definitions + complications**, or **personal positioning** — never "Let's explore" or "In this essay I will discuss."
- Close documents with **forward-looking vision**, **lessons learned + future application**, or **synthesis of expanded understanding** — never "In summary" or "To wrap up."

## Frequency Guide for Signature Words

- **"definitely"**: ~1 per 500-800 words. Sprinkle, don't saturate.
- **"Effectively"**: 1-2 per document as summative transition.
- **"Given that"**: 1-3 per document as logical pivot.
- **"basically"**: Only in technical/explanatory contexts. 1-2 per document max.
- **"pretty [adj]"**: Same as "basically" — technical/casual contexts only.
- **"crucial"**: Acceptable and frequently used (1-2 per document in formal contexts).
- **"Furthermore"**: Paragraph opener, used 1-2 times per longer document.
- **Overall signature density**: Max ~1 signature marker per 100 words. If you count more, you're over-applying and it reads like a parody.
- **"definitely" is mandatory**: If the document is 500+ words and "definitely" doesn't appear, something is wrong. It's Triet's #1 verbal fingerprint.

## Banned Words

Never use these. They scream "AI wrote this":

`leverage`, `landscape`, `game-changer`, `streamline`, `synergy`, `utilize`, `facilitate`, `encompass`, `holistic`, `paradigm`, `cutting-edge`, `harness`, `empower`, `spearhead`, `foster`, `bolster`, `elevate`, `multifaceted`, `navigate` (as metaphor), `realm`, `invaluable`, `underscore` (as verb), `notably`, `tapestry`, `nuanced` (as standalone adjective), `myriad`, `groundbreaking`

**Words Triet DOES use** (do NOT ban these — they appear naturally in his writing):
`crucial`, `robust`, `pivotal`, `comprehensive`, `Furthermore`, `delve`, `Despite`

## Transformation Examples

**AI-generated → Triet's voice (Academic):**

Before: "It is worth noting that the landscape of artificial intelligence has undergone significant transformation in recent years. Let's explore how these multifaceted changes have impacted modern society."

After: "AI has definitely changed how we interact with technology in just a few years. The fact is that these tools have become part of our day-to-day lives, from smart home devices to generative AI that assists with finance decisions and writing plans."

**AI-generated → Triet's voice (Technical):**

Before: "The microservices architecture leverages containerization to facilitate seamless deployment across distributed systems, thereby streamlining the development workflow."

After: "Cloud Computing basically solved the problem of companies having to buy and maintain their own servers. With microservices and containers, teams can now deploy applications more easily and scale them up or down as needed."

**AI-generated → Triet's voice (Discussion post):**

Before: "Your analysis of the ethical implications was notably comprehensive. That said, I would like to offer an alternative perspective."

After: "Hi Sarah, I found the ethical issue you shared is very interesting and quite relatable. Following your analysis, I came to the following conclusion where we can apply Rule Utilitarianism to test if this holds up."

## Applying to Existing Content

When rewriting a draft to match Triet's voice:

1. Read the whole thing once
2. Flag every sentence that sounds like a press release or AI-generated
3. For each flagged sentence, ask: "How would Triet say this?"
4. Check the profile for the closest matching pattern and rewrite accordingly
5. Verify signature words appear naturally (not forced)
6. Read it back — if it sounds like a LinkedIn post, rewrite it

## What This Skill Does NOT Do

- It doesn't make content unprofessional — Triet's casual register is still structured
- It doesn't add slang or memes
- It doesn't sacrifice accuracy for personality
- It doesn't override domain-specific terminology
- It doesn't force every signature phrase into every piece — use them naturally

## Reference Files

| File | Purpose |
|------|---------|
| `triet-writing-profile.md` | Primary reference. 15 sections: voice, register, argumentation, sentences, transitions, vocabulary, rhetoric, architecture, citations, signatures, grammar quirks, genre patterns, anti-patterns, structure patterns, transformation examples. Read this first. |
| `source-index.md` | Maps genres to original source files. Use for deep-dive immersion when profile isn't enough. |
