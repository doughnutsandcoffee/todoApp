
/**
 * state of todo's need count
 */
export const STATE = {
    todoCount: -1        /** @type {number} cummalitive count of the number of todo's or num times user clicked "add" w/non-empty text. */
}

export function getCount(){
    STATE.todoCount++;
}