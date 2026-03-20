<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Native Android Architecture First
  - Template Principle 2 -> II. Unidirectional UI State
  - Template Principle 3 -> III. Data Boundaries via Repository and Room
  - Template Principle 4 -> IV. Hilt-Managed Dependency Graph
  - Template Principle 5 -> V. Testable Changes and Smallest Safe Verification
- Added sections:
  - Platform Constraints
  - Delivery Workflow & Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated `.specify/templates/plan-template.md`
  - ✅ updated `.specify/templates/spec-template.md`
  - ✅ updated `.specify/templates/tasks-template.md`
  - ✅ no command docs present under `.specify/templates/commands`
  - ✅ no runtime guidance updates required in `README.md`
- Follow-up TODOs:
  - None
-->
# Android Starter Constitution

## Core Principles

### I. Native Android Architecture First

All production code MUST preserve the project’s native Android stack: Kotlin, Jetpack Compose,
Material 3, AndroidX ViewModel, Hilt, Room, Coroutines, Flow, and Navigation 3 unless a change
proposal documents a concrete deficiency and the simpler existing stack cannot satisfy the need.
UI work MUST remain inside Compose-driven presentation layers, and Android platform concerns MUST
not be displaced into arbitrary utility layers.

Rationale: This repository exists as an architecture starter template. Architectural drift toward
inconsistent frameworks or mixed paradigms would erode its teaching value, increase maintenance
cost, and make future features less predictable.

### II. Unidirectional UI State

Screens MUST render from immutable UI state exposed by a ViewModel or equivalent state holder.
Composable functions MUST prefer state hoisting, explicit callbacks, and stateless rendering
subfunctions where practical. Business logic, persistence calls, and long-running work MUST NOT be
implemented directly inside composables.

Rationale: Compose operates most reliably when rendering is a pure function of state. Keeping UI
logic thin preserves previewability, recomposition safety, and testability.

### III. Data Boundaries via Repository and Room

Persistence access MUST pass through explicit repository contracts and Room DAOs. ViewModels MUST
depend on repository abstractions rather than directly invoking Room APIs. Room schema changes MUST
include updated schema outputs under `app/schemas/` and an intentional migration decision documented
in the implementation plan or specification.

Rationale: Repository boundaries isolate persistence concerns, preserve test seams, and provide a
stable place for future data mapping or multi-source coordination. Room schema discipline prevents
silent data-loss decisions and keeps persistence evolution auditable.

### IV. Hilt-Managed Dependency Graph

Application-wide dependency construction MUST be owned by Hilt. Shared services such as the Room
database, DAOs, repositories, and other singleton-like infrastructure MUST be provided through Hilt
modules with lifecycle-appropriate scopes. New manual service locators, global mutable singletons,
or hidden object factories MUST NOT be introduced without an explicit exception recorded in the
implementation plan.

Rationale: A single declarative dependency graph reduces construction ambiguity, supports testing
overrides, and allows compile-time validation of wiring.

### V. Testable Changes and Smallest Safe Verification

Every behavior-changing modification MUST include the smallest relevant verification step before
completion. ViewModel, repository, DAO, schema, and other business-logic changes MUST be covered by
or validated against local unit tests where practical. UI behavior changes MUST be verified with the
smallest effective Compose/UI or instrumentation test when feasible, otherwise the implementation
plan MUST explain why a lighter verification strategy was used. Build, lint, or targeted test tasks
MUST be run for changed areas before final delivery unless the environment prevents execution.

Rationale: This project is intended as a reusable starter. Regressions in architectural examples
propagate into downstream apps, so each change must be demonstrably safe.

## Platform Constraints

1. The codebase is a single-module Android application rooted in `app/`.
2. The canonical source layout is:
   - `app/src/main/java/xyz/radenadri/starter/` for production code
   - `app/src/test/` for local JVM tests
   - `app/src/androidTest/` for instrumentation and Compose UI tests
   - `app/schemas/` for Room schema history
3. Features SHOULD preserve existing package boundaries:
   - `ui/` for presentation and navigation
   - `data/` for repositories and data contracts
   - `data/local/` for Room entities, DAO, database, and DI
4. New external dependencies MUST be justified in the feature specification or plan with a reason
   that existing AndroidX, Kotlin, Hilt, or Room facilities are insufficient.
5. Generated files and manual source files MUST remain separate. Room schema artifacts MUST NOT be
   edited as if they were handwritten source.

## Delivery Workflow & Quality Gates

1. Specifications and implementation plans MUST identify:
   - affected layers (`ui`, `ViewModel`, repository, DAO/database, DI, tests)
   - verification strategy
   - migration impact if persistence changes
2. Plans MUST fail constitution review if they:
   - place business logic in composables
   - bypass repository boundaries
   - introduce unmanaged dependencies outside Hilt
   - omit verification for behavior changes
   - modify Room schema without recording schema or migration impact
3. Tasks MUST be organized so user-visible stories remain independently testable. Cross-cutting
   infrastructure work SHOULD be limited to genuine prerequisites.
4. Code review MUST check for:
   - unidirectional state flow
   - explicit data ownership
   - smallest-correct architectural change
   - relevant tests or recorded justification for their absence
5. Documentation that describes architecture, modules, or setup MUST be updated when changes alter
   how the project is structured or verified.

## Governance

This constitution supersedes conflicting local planning habits and template defaults. Every feature
plan, task list, and implementation review MUST include an explicit constitution compliance check.

Amendments:
- Amendments MUST be made in `.specify/memory/constitution.md`.
- Any amendment MUST include a Sync Impact Report describing required downstream template or
  documentation changes.
- Dependent templates under `.specify/templates/` MUST be updated in the same change when the
  constitution changes their expectations.

Versioning Policy:
- MAJOR increments denote backward-incompatible governance changes or removal/redefinition of a core
  principle.
- MINOR increments denote new principles, new mandatory sections, or materially expanded quality
  gates.
- PATCH increments denote clarifications, wording improvements, or non-semantic refinements.

Compliance Review:
- Plans MUST document how the work preserves Compose UI boundaries, repository/data boundaries,
  Hilt-managed construction, and verification discipline.
- Implementations MUST run the smallest relevant build, lint, or test target for touched behavior
  unless tooling constraints prevent it; such constraints MUST be documented in the delivery
  summary.
- Reviewers SHOULD reject changes that add architectural complexity without a documented rationale.

**Version**: 1.0.0 | **Ratified**: 2026-03-20 | **Last Amended**: 2026-03-20