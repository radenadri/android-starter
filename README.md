# Android Starter

A single-module Android starter application built with modern Jetpack libraries and intended as a clean baseline for local-first Android app development.

## Overview

This project demonstrates a small but production-aligned Android architecture using:

- **Kotlin**Generate architecture documentation for this codebase
- **Jetpack Compose** + **Material 3**
- **AndroidX ViewModel**
- **Hilt** for dependency injection
- **Room** for local persistence
- **Kotlin Coroutines** and **Flow**
- **Navigation 3**
- **Unit tests** and **Compose/UI instrumentation tests**

The current sample feature is a simple **Todo** workflow that supports creating, listing, and deleting locally stored items.

## Architecture Summary

The application follows a layered structure:

- **UI layer** in `app/src/main/java/xyz/radenadri/starter/ui/`
- **State layer** using `TodoViewModel`
- **Repository layer** in `app/src/main/java/xyz/radenadri/starter/data/`
- **Room persistence layer** in `app/src/main/java/xyz/radenadri/starter/data/local/`
- **Hilt dependency graph** for application-wide wiring

Additional project documentation:

- `ARCHITECTURE.md` — detailed architecture documentation
- `MODULES.md` — route / feature / module mapping
- `.specify/memory/constitution.md` — project engineering constitution

## Project Structure

```text
app/
├── src/
│   ├── main/
│   │   ├── java/xyz/radenadri/starter/
│   │   │   ├── ui/
│   │   │   ├── data/
│   │   │   └── AppStarter.kt
│   │   └── res/
│   ├── test/
│   └── androidTest/
└── schemas/
```

## Features

- Todo list UI built in Compose
- Local persistence with Room
- Reactive state with Flow and `StateFlow`
- Hilt-based dependency injection
- Typed navigation with Navigation 3
- Unit tests for repository and ViewModel
- Instrumentation and Compose UI tests

## Requirements

- Latest stable **Android Studio**
- Android SDK configured locally
- JDK compatible with the Android Gradle Plugin in this project

## Build and Run

### Build debug APK

```bash
./gradlew assembleDebug
```

### Run unit tests

```bash
./gradlew :app:testDebugUnitTest
```

### Run Android lint

```bash
./gradlew :app:lintDebug
```

### Run instrumentation tests

Requires an emulator or connected Android device.

```bash
./gradlew :app:connectedDebugAndroidTest
```

## Notes

- This repository has already been customized for the package `xyz.radenadri.starter`.
- The sample application class is `AppStarter`.
- Room schema outputs are stored in `app/schemas/`.
- If you change the database schema, update the schema history intentionally and document migration impact.

## License

This project includes Apache 2.0 licensed starter code. See `LICENSE` for details.