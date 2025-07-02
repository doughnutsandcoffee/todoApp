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

    // addButtons : document.querySelectorAll(".add-button"),               /** @type {HTMLButtonElement} Buttons to "add" no ToDo. */
    // deleteButtons : document.querySelectorAll(".delete-button"),         /** @type {HTMLButtonElement} Buttons to "delete" ToDo. */

    // addButton : document.getElementById("add-btn"),                     /** @type {HTMLButtonElement} Button to "add" no ToDo. */
    // deleteButton : document.getElementById("delete-btn"),               /** @type {HTMLButtonElement} Button to "delete" ToDo. */
}