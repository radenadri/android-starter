# Modules

This repository is a **single-module Android application** (`app`) built with **Jetpack Compose**, **Material 3**, **Hilt**, **Room**, **Coroutines/Flow**, and **Navigation 3**.

## Dependency Summary

- **UI**: Jetpack Compose, Material 3
- **Navigation**: `androidx.navigation3`
- **State / Lifecycle**: ViewModel, Lifecycle Compose, Coroutines, Flow
- **Dependency Injection**: Hilt
- **Persistence**: Room
- **Code Generation**: KSP
- **Testing**: JUnit, Coroutines Test, Compose UI Test, Hilt Testing

## Route / Feature Map

| Route | Related Files | Feature Name | Status |
| -------- | ------- | ------- | ------- |
| **App Entry & Navigation** | | | |
| launcher / main | `app/src/main/java/xyz/radenadri/starter/ui/MainActivity.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/Navigation.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/NavigationKeys.kt`<br>`app/src/main/java/xyz/radenadri/starter/AppStarter.kt` | App Entry, Theme Host, and Root Navigation | ✅ |
| **Todo Feature** | | | |
| Main | `app/src/main/java/xyz/radenadri/starter/ui/Navigation.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/todo/TodoScreen.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/todo/TodoViewModel.kt` | Todo List Screen | ✅ |
| **Data & Persistence** | | | |
| todo-data | `app/src/main/java/xyz/radenadri/starter/data/TodoRepository.kt`<br>`app/src/main/java/xyz/radenadri/starter/data/local/database/Todo.kt`<br>`app/src/main/java/xyz/radenadri/starter/data/local/database/AppDatabase.kt` | Todo Repository and Room Persistence | ✅ |
| **Dependency Injection** | | | |
| di-data | `app/src/main/java/xyz/radenadri/starter/data/di/DataModule.kt`<br>`app/src/main/java/xyz/radenadri/starter/data/local/di/DatabaseModule.kt` | Hilt Modules for Repository and Database | ✅ |
| **Design System / Theme** | | | |
| theme | `app/src/main/java/xyz/radenadri/starter/ui/theme/Color.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/theme/Theme.kt`<br>`app/src/main/java/xyz/radenadri/starter/ui/theme/Type.kt` | Compose Theme and Material Styling | ✅ |
| **Testing** | | | |
| unit-test | `app/src/test/java/xyz/radenadri/starter/data/DefaultTodoRepositoryTest.kt`<br>`app/src/test/java/xyz/radenadri/starter/ui/todo/TodoViewModelTest.kt` | Repository and ViewModel Unit Tests | ✅ |
| android-test | `app/src/androidTest/java/xyz/radenadri/starter/HiltTestRunner.kt`<br>`app/src/androidTest/java/xyz/radenadri/starter/testdi/TestDatabaseModule.kt`<br>`app/src/androidTest/java/xyz/radenadri/starter/ui/NavigationTest.kt`<br>`app/src/androidTest/java/xyz/radenadri/starter/ui/todo/TodoScreenTest.kt` | Instrumentation and Compose UI Tests | ✅ |

## Notes

- The app currently exposes a single navigation destination: `Main`.
- `MainActivity` sets up edge-to-edge UI and hosts `MainNavigation()`.
- `TodoScreen` displays the list and forwards actions to `TodoViewModel`.
- `TodoViewModel` collects data from `TodoRepository` as `StateFlow`.
- `DefaultTodoRepository` maps Room entities to simple UI strings.
- Room schema output is stored in `app/schemas/`.