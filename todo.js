/** @module Todo core application functionality */

import { DOM } from "./dom.js";
import { STATE, incrementCount } from "./state.js"

/** @type {string[]} */ 
export let allTodos = [];

/**
 * driver function
 * @returns {void}
 */
export function startTodo(){
    handleAdd();
    handleDelete();
}

/**
 * Configures an event listener to handle form submission event triggered when user, clicks "Add" button or presses "enter" key
 * @param {SubmitEvent} e - The form submission event (applies to the listener callback).
 * @returns {void}
 */
export function handleAdd() {

    DOM.formContainer.addEventListener("submit", function(e) {

        e.preventDefault(); // prevents default browser action but not event propogation ("submit" - sumbits form to a server)
        const userInput = DOM.todoInput.value.trim(); // submit event - captures current user input text
        
        // a: empty input
        if(!userInput) {
            alert("Please enter a todo!");
            return;

        // b: valid input
        } else {
        buildTodo(userInput);
        // console.log(`${STATE.todoCount}: "submit" triggered`);
        }

    });
    // console.log(`${STATE.todoCount}: handleAdd() initialized`);
}

/*
    1. enter text ... check not empty
    2. hit "add" ... event listner
    3. <li class="todo-list-bullets-container">
    4. <input class="text-input" type="checkbox" id="todo-1">
    5. <label class="custom-checkbox" for="todo-1"><img src="images/check.svg" alt="checkbox"></label>
    6. <label for="todo-1" class="todo-text"><p>PLAIN-TEXT</p></label>
    7. <button id="delete-btn" class="delete-button" aria-label="Delete"></button>
 */

/**
 * Creates and appends a todo item todo-list class's ul element in the DOM.
 * @param {string} userInput - The user-entered todo text.
 * @returns {void}
 */
export function buildTodo(userInput){
    // allTodos.push(userInput);
    incrementCount();

    // bullet: <li class="todo-list-bullets-container"></li>
    let li = document.createElement("li")
    li.classList.add("todo-list-bullets-container");

    // input: <input class="text-input" type="checkbox" id="todo-1"> 
    let checkboxInput = document.createElement("input");
    checkboxInput.id = `todo-${STATE.todoCount}`; 
    checkboxInput.classList.add("text-input");
    checkboxInput.type = "checkbox";
    
    // checkbox:  <label class="custom-checkbox" for="todo-1"><img src="images/check.svg" alt="checkbox"></label>
    let checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    checkboxLabel.htmlFor = `todo-${STATE.todoCount}`;

    let imgCheckbox = document.createElement("img");
    imgCheckbox.src = "images/check.svg";
    imgCheckbox.alt = "checkbox";
    checkboxLabel.appendChild(imgCheckbox);
    
    // text <label>: <label for="todo-1" class="todo-text"><p>webdev project with html, css and js</p></label>
    let textLabel = document.createElement("label");
    textLabel.classList.add("todo-text");
    textLabel.htmlFor = `todo-${STATE.todoCount}`;
    
    let todoText = document.createElement("p");
    todoText.textContent = userInput;
    textLabel.appendChild(todoText);

    // button: <button id="delete-btn-1" class="delete-button" aria-label="Delete"></button>
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-btn-${STATE.todoCount}`;
    deleteButton.classList.add("delete-button");
    deleteButton.ariaLabel = "Delete";

    li.append(checkboxInput, checkboxLabel, textLabel, deleteButton);
    DOM.todoListContainer.appendChild(li);

    DOM.formContainer.reset(); // reset form elements to default values: input, button
}

/**
 * Configures one-event-listener, to delete specifc todo, for all "li" tags (individual todo's created by user)
 * @param {ClickEvent} e - The click event (applies to the listener callback).
 * @returns {void}
 */
export function handleDelete(){
    // console.log(`${STATE.todoCount}: deleteTodo() initialized`);
    DOM.todoListContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) { // .target, ref. to the object onto which the event was dispatched.
            // console.log(`${STATE.todoCount}: Inside, removing <li>`);
            e.target.closest("li").remove();
        }
    });
}