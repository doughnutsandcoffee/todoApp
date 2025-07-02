/** @module TodoState */

/**
 * Maintains the state of todo-related global variables.
 */
export const STATE = {
    todoCount: -1        /** @type {number} Cummalitive count of todo's or number of times user clicked "add" with non-empty text. */
}

/**
 * increments todo count and returns updated value.
 * @returns {number} Updated todo count.
 */
export function incrementCount(){
    // start at -1 ... increment first ++ ... return value 0 as first todo-0
    ++STATE.todoCount;
}