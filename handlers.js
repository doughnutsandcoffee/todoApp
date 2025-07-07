/** @module Event handling for Todo application */

import { DOM, buildTodo } from "./dom.js";
import {internallyRemoveTodo, todosArray } from "./state.js";
import { writeToLocalStorage } from "./storage.js";

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
 * Update state of checkbox associated with parent li id 
 * @param {ClickEvent} e - change event
 * @returns {void} -
 */
export function handleCheckbox() {
    DOM.todoListContainer.addEventListener("change", (e) => {

        // filter for change event of type checkbox, get id of li "todo", use id to get parent/todo, update Checkbox state/localStorage
        if (e.target.type === "checkbox") {
            // state.js id is saved as a string BUT Date.now() creates id as a number -> convert to text `${}`
            const targetID = e.target.closest("li").id;
            const todo = todosArray.find(todo => todo.id === `${targetID}`); 
            //console.log("todo:", todo);
            if (todo) {
                todo.checkboxState = e.target.checked;
                writeToLocalStorage();
            }
        }
    });
}

/**
 * Configures one-event-listener, to delete specifc todo, for all "li" tags (individual todo's created by user)
 * @param {ClickEvent} e - The click event (applies to the listener callback).
 * @returns {void}
 */
export function handleDelete(){
    console.log("handleDelete():");
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