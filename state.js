/** @module Internal state management for Todo application */

/**
 * Update internal todosArray by pushing an object with the id, text, and checkboxState of user's most recently added todo
 * @param { string } todoText - The user-entered todo text.
 * @param { string } timestamp - Timestamp todo originally created at.
 * @returns {void}
 */
export function internallyStoreTodo(todoText, timestamp){
    const todo = {
        "id" : `${timestamp}`, // added id to li ... match
        "text" : todoText,
        "checkboxState" : false,
    }
    todosArray.push(todo);
}

/**
 * Creates new internal todosArray once remove object with the matching id of the targetID, todo corresponding to the most recent delete event
 * @param { string } id - The user-entered todo text.
 * @returns {void}
 */
export function internallyRemoveTodo(targetID){
    todosArray = todosArray.filter(todo => todo.id !==targetID);
}