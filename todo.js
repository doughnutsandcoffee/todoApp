/** @module Todo core application functionality */

import { DOM } from "./dom.js";
/** @module DOM manipulation for Todo application */
// import { DOM, buildTodo, renderTodos } from "./dom.js";
/** @module Event handling for Todo application */
// import { handleAdd, handleCheckbox, handleDelete } from "./handlers.js";
/** @module Internal state management for Todo application */
// import { internallyRemoveTodo, internallyStoreTodo, todosArray } from "./state.js";
/** @module Local storage operations for Todo application */
// import { loadTodos, retrieveTodosFromLocalStorage, writeToLocalStorage } from "./storage.js";

/** @type {Array<{id: string, text: string, checkboxState: boolean}>} */
export let todosArray = [];

/**
 * Initializes the Todo application by loading todos from storage and setting up event handlers for adding and deleting todos.
 * @returns {void}
 */
export function startTodo(){
    loadTodos();
    handleAdd();
    handleDelete();
    // handleCheckbox();
}

/* --------------------------------- handlers.js --------------------------------- */

/**
 * Configures an event listener to handle form submission event triggered when user, clicks "Add" button or presses "enter" key
 * @param {SubmitEvent} e - The form submission event (applies to the listener callback).
 * @returns {void}
 */
export function handleAdd() {
    DOM.formContainer.addEventListener("submit", function(e) {
        
        e.preventDefault(); // prevents default browser action but not event propogation ("submit" - sumbits form to server && reloads page)
        const userInput = DOM.todoInput.value.trim(); // submit event - captures current user input text
        
        // a: empty input
        if(!userInput) {
            alert("Please enter a todo!");
            return;

        // b: valid input
        } else {
        buildTodo(userInput);
        }
    });;
}

/**
 * @param {} xxxx - 
 * @param {ClickEvent} e -
 * @returns {void} -
 */
export function handleCheckbox(){
    console.log("handleCheckbox() called.")
}

/**
 * Configures one-event-listener, to delete specifc todo, for all "li" tags (individual todo's created by user)
 * @param {ClickEvent} e - The click event (applies to the listener callback).
 * @returns {void}
 */
export function handleDelete(){

    DOM.todoListContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) { // e.target is actual html element "clicked"
            // 1. get parent id to, remove from array
            const targetID = e.target.closest("li").id;
            internallyRemoveTodo(targetID); 
            
            // 2. remove parent, update storage
            e.target.closest("li").remove();
            writeToLocalStorage(); // use internall array don't need to call localStorage.removeItem()
        }
    });
}

/* --------------------------------- dom.js --------------------------------- */

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
export function renderTodos(todo) {
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

/* --------------------------------- state.js --------------------------------- */

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

/* --------------------------------- storage.js --------------------------------- */

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
    todosJsonArray.forEach(todo => renderTodos(todo));
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