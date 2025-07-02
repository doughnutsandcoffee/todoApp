/** @module DOMCache */

/**
 * Caches frequently used HTML DOM elements to avoid repeated DOM queries for efficiency.
 * Parents are queried using `querySelector` (returns static NodeList) to access children through them.
 * @namespace
 */

export const DOM = {
    formContainer: document.querySelector(".form-container"),               /** @type {HTMLElement} Container for todo form tag. */
    todoInput : document.getElementById("todo-input"),                      /** @type {HTMLElement} Input field for todo text. */
    todoListContainer : document.getElementById("todo-list-container"),     /** @type {HTMLElement} Unordered list element for todo items. */
    // addButton : document.getElementById("add-btn"),                     /** @type {HTMLButtonElement} Button to "add" a todo. */
}