/** @module DOM manipulation for Todo application */

import { internallyStoreTodo } from "./state.js";
import { writeToLocalStorage } from "./storage.js";

/**
 * Caches frequently used HTML DOM elements to avoid repeated DOM queries for efficiency.
 * Parents are queried using `querySelector` (returns static NodeList) to access children through them.
 * @namespace
 */

export const DOM = {
    formContainer: document.querySelector(".form-container"),               /** @type {HTMLElement} Container for todo form tag. */
    todoInput: document.getElementById("todo-input"),                      /** @type {HTMLInputElement} Input field for todo text. */
    todoListContainer : document.getElementById("todo-list-container"),     /** @type {HTMLElement} Unordered list element for todo items. */
}

/**
 * Creates and appends a todo item todo-list class's ul element in the DOM.
 * @param {string} userInput - The user-entered todo text.
 * @returns {void}
 */
export function buildTodo(userInput){
    const timestamp = Date.now(); // ensure all elements for ea. unique todo share same timestamp, before called separately for each child element

    // bullet: <li class="todo-list-bullets-container"></li>
    let li = document.createElement("li")
    li.classList.add("todo-list-bullets-container");
    li.id = `${timestamp}`;

    // input: <input class="text-input" type="checkbox" id="todo-1"> 
    let checkboxInput = document.createElement("input"); 
    checkboxInput.id = `todo-${timestamp}`; 
    checkboxInput.classList.add("text-input");
    checkboxInput.type = "checkbox";
    
    // checkbox:  <label class="custom-checkbox" for="todo-1"><img src="images/check.svg" alt="checkbox"></label>
    let checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    checkboxLabel.htmlFor = `todo-${timestamp}`;

    let imgCheckbox = document.createElement("img");
    imgCheckbox.src = "images/check.svg";
    imgCheckbox.alt = "checkbox";
    checkboxLabel.appendChild(imgCheckbox);
    
    // text <label>: <label for="todo-1" class="todo-text"><p>webdev project with html, css and js</p></label>
    let textLabel = document.createElement("label");
    textLabel.classList.add("todo-text");
    textLabel.htmlFor = `todo-${timestamp}`;
    
    let todoText = document.createElement("p");
    todoText.textContent = userInput;
    textLabel.appendChild(todoText);

    // button: <button id="delete-btn-1" class="delete-button" aria-label="Delete"></button>
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-btn-${timestamp}`;
    deleteButton.classList.add("delete-button");
    deleteButton.ariaLabel = "Delete";

    li.append(checkboxInput, checkboxLabel, textLabel, deleteButton);
    DOM.todoListContainer.appendChild(li);

    internallyStoreTodo(todoText.textContent, timestamp); // internal array updated
    writeToLocalStorage();

    DOM.formContainer.reset(); // reset form elements to default values: input, button
}

/**
 * Renders a single todo item from localStorage to the DOM.
 * @param {Object} todo - Todo object with id, text, and checkboxState.
 * @returns {void}
 */
export function renderTodo(todo) {
    // Create <li class="todo-list-bullets-container"></li>
    let li = document.createElement("li");
    li.classList.add("todo-list-bullets-container");
    li.id = todo.id;

    // Create <input class="text-input" type="checkbox" id="todo-[id]">
    let checkboxInput = document.createElement("input");
    checkboxInput.id = `todo-${todo.id}`;
    checkboxInput.classList.add("text-input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = todo.checkboxState; // Reflect stored state

    // Create <label class="custom-checkbox" for="todo-[id]"><img src="images/check.svg" alt="checkbox"></label>
    let checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    checkboxLabel.htmlFor = `todo-${todo.id}`;

    let imgCheckbox = document.createElement("img");
    imgCheckbox.src = "images/check.svg";
    imgCheckbox.alt = "checkbox";
    checkboxLabel.appendChild(imgCheckbox);

    // Create <label for="todo-[id]" class="todo-text"><p>[text]</p></label>
    let textLabel = document.createElement("label");
    textLabel.classList.add("todo-text");
    textLabel.htmlFor = `todo-${todo.id}`;

    let todoText = document.createElement("p");
    todoText.textContent = todo.text;
    textLabel.appendChild(todoText);

    // Create <button id="delete-btn-[id]" class="delete-button" aria-label="Delete"></button>
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-btn-${todo.id}`;
    deleteButton.classList.add("delete-button");
    deleteButton.ariaLabel = "Delete";

    li.append(checkboxInput, checkboxLabel, textLabel, deleteButton);
    DOM.todoListContainer.appendChild(li);
}