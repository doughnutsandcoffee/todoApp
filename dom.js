// ---------------------------- HTML DOM ELEMENTS --------------------------
// cache frequently used html elements instead of querying DOM repeatedly
// cache parents (querySelector: returns static NodeList) b/c access children through parents (more efficent)

export const DOM = {
    formContainer: document.querySelector(".form-container"),           /** @type {HTMLElement} Todo form container. */

    todoInput : document.getElementById("todo-input"),                  /** @type {HTMLElement} Todo text input. */
    todoListContainer : document.getElementById("todo-list-container"), /** @type {HTMLElement} Todo UL list element. */

    addButton : document.querySelectorAll(".add-button"),               /** @type {HTMLButtonElement} Buttons to "add" no ToDo. */
    deleteButton : document.querySelectorAll(".delete-button"),         /** @type {HTMLButtonElement} Buttons to "delete" ToDo. */

    addButton : document.getElementById("add-btn"),                     /** @type {HTMLButtonElement} Button to "add" no ToDo. */
    deleteButton : document.getElementById("delete-btn"),               /** @type {HTMLButtonElement} Button to "delete" ToDo. */
}