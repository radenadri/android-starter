# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview
- Android app for healthcare workflows built as a single `:app` module.
- Tech stack: Kotlin 2.1, Jetpack Compose, Material 3, Navigation Compose, Hilt, Room, Coroutines/Flow.
- Persistence is entirely local today: Room database `vickyapp.db` with no backend/API layer present in the codebase.
- Main app package: `xyz.radenadri.vicky`.

## Common commands
Run all commands from the repository root.

### Build
- `./gradlew build` — full build
- `./gradlew assembleDebug` — build debug APK
- `./gradlew clean` — clean outputs
- `./gradlew build --refresh-dependencies` — refresh dependencies and rebuild

### Lint
- `./gradlew lint` — all Android lint checks
- `./gradlew lintDebug` — lint debug variant

### Tests
- `./gradlew test` — all unit tests
- `./gradlew testDebugUnitTest` — debug unit tests
- `./gradlew connectedDebugAndroidTest` — instrumented/UI tests; requires device or emulator

### Run a single test
- `./gradlew testDebugUnitTest --tests "xyz.radenadri.vicky.ui.MainViewModelTest"`
- `./gradlew testDebugUnitTest --tests "xyz.radenadri.vicky.ui.MainViewModelTest.someMethod"`
- `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=xyz.radenadri.vicky.ui.NavigationTest`
- `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=xyz.radenadri.vicky.ui.NavigationTest#testNavigation`

## Repository structure
- `app/src/main/java/xyz/radenadri/vicky/` — production code
- `app/src/test/java/` — local unit tests
- `app/src/androidTest/java/` — instrumented tests, including Hilt test runner
- `app/src/main/res/` — resources
- `app/schemas/` — Room schema output generated via KSP; do not remove when changing Room schema
- `gradle/libs.versions.toml` — central dependency and plugin versions

## Architecture

### App shell
- `Vicky.kt` is the `@HiltAndroidApp` application entry point.
- `ui/MainActivity.kt` is the single activity; it enables edge-to-edge and renders `MainNavigation()` inside `VickyTheme`.

### Navigation model
- `ui/Navigation.kt` owns the app-wide `NavHost`.
- Start destination is `splashscreen`, which decides the initial flow before login/main screens.
- Most feature routing is centralized in this single file rather than split into per-feature graphs.
- The main authenticated shell is `ui/main/MainView.kt`, which uses a bottom navigation bar to swap between four top-level sections: Home, Patients, Calendar, and Encounters.

### UI/state pattern
- UI is Compose-first.
- Feature screens generally live under `ui/main/...` grouped by workflow area (`home`, `patients`, `encounters`, `scheduling`, `menu`, `login`, etc.).
- ViewModels are colocated with feature screens and typically expose `StateFlow` consumed directly by composables.
- A shared `Results` / multi-state rendering pattern is used for loading, success, empty, and failure states; `ui/components/MultiStateView.kt` is part of that pattern.

### Data layer
- Room is the source of truth. `data/local/database/AppDatabase.kt` defines a large local schema covering patients, appointments, encounters, medications, labs, tasks, notes, catalogs, and auth.
- `di/VickyModule.kt` provides the singleton Room database and repository bindings through Hilt.
- Repository interfaces live in `data/repository/`; current concrete implementations are in `data/datastore/` and mostly delegate straight to DAOs.
- DAOs and entities are under `data/local/database/dao/` and `.../entity/`.
- Type conversion logic is in `data/local/Converters.kt`.

### Feature/domain shape
- The app is organized around healthcare workflows rather than technical layers alone:
  - authentication/legal
  - home/security/sync
  - patients and their subflows (vitals, problems, medications, prescriptions, orders, complaints, treatments)
  - encounters and assessments
  - scheduling/tasks/appointments
  - profile/menu/forms/PIN
  - search
- `MODULES.md` is useful when mapping a route name to the primary files involved.

## Build and tooling details
- JVM/toolchain target is 17.
- `compileSdk` / `targetSdk` are 35; `minSdk` is 27.
- Compose is enabled in `app/build.gradle.kts`.
- KSP is configured to emit Room schemas into `app/schemas`.
- Instrumented tests use `xyz.radenadri.vicky.HiltTestRunner`.

## Testing notes
- Existing test coverage is light and includes both unit and Compose navigation/UI tests.
- Android test wiring is Hilt-based via `HiltTestRunner`.
- There is a placeholder `androidTest/testdi/TestDatabaseModule.kt`; if adding Hilt-backed test replacements, check whether it should be revived or replaced.

## Repo-specific guidance
- Prefer following the current architecture: Compose UI -> ViewModel -> repository/datastore -> Room DAO.
- Keep new screens inside the existing workflow folders under `ui/main/...` and register routes in `ui/Navigation.kt`.
- Keep dependency versions centralized in `gradle/libs.versions.toml`.
- This repo already has `AGENTS.md`, `Architecture.md`, and `MODULES.md`; use them for deeper context before large refactors.
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` were present when this file was generated.
