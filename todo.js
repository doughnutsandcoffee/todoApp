/** @module Todo core application functionality */

import { DOM } from "./dom.js";
import { STATE, getCount } from "./state.js"

/** @type {string[]} */ 
export let allTodos = [];

/**
 * Creates event listener to handle form submission event created when user clicks "Add" button/hits "enter", after user input text"
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
    //let userInput = ""; // need text outside function
    DOM.formContainer.addEventListener("submit", function(e) {
        e.preventDefault(); // prevents default browser action but not event propogation ("submit" - sumbits form to a server)
        const userInput = DOM.todoInput.value.trim(); // only capture text on "submit" ... guessing b/c clear after
        // console.log(`user Input: ${userInput}`);
        
        if(!userInput) {
            alert("Please enter a todo!");
            return;
        }
        buildTodo(userInput);
        deleteTodo();
    })
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

    let li = document.createElement("li")
    Object.assign(li, {className: "todo-list-bullets-container"});
    // li.classList.add("todo-list-bullets-container");

    // classList.add("text-input"); returns undefined
    let checkboxInput = document.createElement("input");
    Object.assign(checkboxInput, {className: "text-input", type: "checkbox", id: `todo-${STATE.todoCount}`});
    // checkboxInput.classList.add("text-input");
    // checkboxInput.type = "checkbox";
    // checkboxInput.id = `todo-${STATE.todoCount}`;
    
    let checkboxlabel = document.createElement("label");
    Object.assign(checkboxlabel, {className: "custom-checkbox", htmlFor: `todo-${STATE.todoCount}`});
    // checkboxLabel.classList.add("custom-checkbox");
    // checkboxLabel.htmlFor = `todo-${STATE.todoCount}`;

    let imgCheckbox = document.createElement("img");
    Object.assign(imgCheckbox, {src: "images/check.svg", alt: "checkbox"});
    checkboxlabel.appendChild(imgCheckbox);
    // imgCheckbox.src = "imgages/check.svg";
    // imgCheckbox.alt = "checkbox";
    // checkboxlabel.appendChild(imgCheckbox);
    
    let labelTodoText = document.createElement("label");
    Object.assign(labelTodoText, {className: "todo-text", htmlFor: `todo-${STATE.todoCount}`});
    // textLabel.classList.add("todo-text");
    // textLabel.htmlFor = `todo-${STATE.todoCount}`;
    
    let todoText = document.createElement("p");
    todoText.textContent = userInput;
    labelTodoText.appendChild(todoText);

    let deleteButton = document.createElement("button");
    Object.assign(deleteButton, {id: `delete-btn-${STATE.todoCount}`, className: "delete-button", "aria-label": "Delete"});
    // deleteButton.classList.add("delete-button");
    // deleteButton.ariaLabel = "Delete";
    // deleteButton.addEventListener("click", () => li.remove()); // add on-click for delete

    li.append(checkboxInput, checkboxlabel, labelTodoText, deleteButton);
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