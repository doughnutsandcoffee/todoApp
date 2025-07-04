/** @module Todo core application functionality */

import { DOM, buildTodo, renderTodos } from "./dom.js";
import { handleAdd, handleCheckbox, handleDelete } from "./handlers.js";
import { internallyStoreTodo, todosArray } from "./state.js";
import { loadTodos, writeToLocalStorage } from "./storage.js";

/**
 * Initializes the Todo application by loading todos from storage and setting up event handlers.
 * @returns {void}
 */
export function startTodo(){
    loadTodos();
    handleAdd();
    handleCheckbox();
    handleDelete();
}