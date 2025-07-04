/** @module Todo core application functionality */

import { handleAdd, handleCheckbox, handleDelete } from "./handlers.js";
import { loadTodos } from "./storage.js";

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