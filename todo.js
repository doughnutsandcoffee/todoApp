/** @module Todo core application functionality */

import { DOM } from "./dom.js";
import { STATE, incrementCount } from "./state.js"

/** @type {string[]} */ 
export let allTodos = [];

/**
 * Creates event listener to handle form submission event created when user clicks "Add" button/hits "enter"
 * @param {SubmitEvent} e - The form submission event (applies to the listener callback).
 * @returns {void}
 */
export function handleAdd() {
    /* 
        https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        addEventListener(type, listener, options){}

        string representing the event type to listen for
        object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs.
        object that specifies characteristics about the event listener

        https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#events
        The submit event fires when a form is submitted.
    */

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
        // deleteTodo();
        }
    })
    deleteTodo();
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
    checkboxInput.id = `todo-${STATE.todoCount}`;   
    let checkboxInput = document.createElement("input");
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
    deleteButton.addEventListener("click", () => li.remove()); // add on-click for delete

    li.append(checkboxInput, checkboxLabel, textLabel, deleteButton);
    DOM.todoListContainer.appendChild(li);

    DOM.formContainer.reset(); // all form elements reset: input, button
}

/**
 * Establishes one-event-listener, to delete specifc todo, for all "li" tags (individual todo's created by user)
 * @returns {void}
 */
export function deleteTodo(){
    DOM.todoListContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
          e.target.closest("li").remove();
        }
      });
}