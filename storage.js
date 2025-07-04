/** @module Local storage operations for Todo application */

import { renderTodo } from "./dom.js";
import { todosArray } from "./state.js";

/**
 * Store the todosArray in local storage by converting (serializing) the array of JSON objects into a flat string
 * @returns {void}
 */
export function writeToLocalStorage(){
    const todosJSON = JSON.stringify(todosArray);
    localStorage.setItem("saved-todos", todosJSON); // updating storage b/c always us same key
}

/**
 * Retrieve the todos from local storage by converting (parsing) the flat string into an array of JSON objects 
 * @returns {Array} JSON.parse(todos) - array of todo JSON objects
 */

export function loadTodos(){ 
    const todosJsonArray = retrieveTodosFromLocalStorage();
    todosJsonArray.forEach(todo => renderTodo(todo));
}

/**
 * Retrieve the todos from local storage by converting (parsing) the flat string into an array of JSON objects 
 * @returns {Array} JSON.parse(todos_String) - array of todo JSON objects
 */

export function retrieveTodosFromLocalStorage(){ 
    const todos_String = localStorage.getItem("saved-todos") || "[]";
    const todosJsonArray = JSON.parse(todos_String);
    return todosJsonArray;
}