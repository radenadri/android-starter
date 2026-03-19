/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package xyz.radenadri.starter.ui.todo

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import xyz.radenadri.starter.data.TodoRepository
import xyz.radenadri.starter.ui.todo.TodoUiState.Error
import xyz.radenadri.starter.ui.todo.TodoUiState.Loading
import xyz.radenadri.starter.ui.todo.TodoUiState.Success
import javax.inject.Inject

@HiltViewModel
class TodoViewModel @Inject constructor(
    private val todoRepository: TodoRepository
) : ViewModel() {

    val uiState: StateFlow<TodoUiState> = todoRepository
        .todos.map<List<String>, TodoUiState>(::Success)
        .catch { emit(Error(it)) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), Loading)

    fun addTodo(name: String) {
        viewModelScope.launch {
            todoRepository.add(name)
        }
    }
}

sealed interface TodoUiState {
    object Loading : TodoUiState
    data class Error(val throwable: Throwable) : TodoUiState
    data class Success(val data: List<String>) : TodoUiState
}
