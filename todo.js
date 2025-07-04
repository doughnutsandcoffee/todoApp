/** @module Todo core application functionality */
import { DOM } from "./dom.js";

/** @type {string[]} */ 
export let todosArray = [];

/**
 * driver function
 * @returns {void}
 */
export function startTodo(){
    loadTodos();
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

        e.preventDefault(); // prevents default browser action but not event propogation ("submit" - sumbits form to server && reloads page)
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

    // bullet: <li class="todo-list-bullets-container"></li>
    let li = document.createElement("li")
    li.classList.add("todo-list-bullets-container");

    // input: <input class="text-input" type="checkbox" id="todo-1"> 
    let checkboxInput = document.createElement("input"); 
    checkboxInput.id = `todo-${Date.now()}`; 
    checkboxInput.classList.add("text-input");
    checkboxInput.type = "checkbox";
    
    // checkbox:  <label class="custom-checkbox" for="todo-1"><img src="images/check.svg" alt="checkbox"></label>
    let checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    checkboxLabel.htmlFor = `todo-${Date.now()}`;

    let imgCheckbox = document.createElement("img");
    imgCheckbox.src = "images/check.svg";
    imgCheckbox.alt = "checkbox";
    checkboxLabel.appendChild(imgCheckbox);
    
    // text <label>: <label for="todo-1" class="todo-text"><p>webdev project with html, css and js</p></label>
    let textLabel = document.createElement("label");
    textLabel.classList.add("todo-text");
    textLabel.htmlFor = `todo-${Date.now()}`;
    
    let todoText = document.createElement("p");
    todoText.textContent = userInput;
    textLabel.appendChild(todoText);

    // button: <button id="delete-btn-1" class="delete-button" aria-label="Delete"></button>
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-btn-${Date.now()}`;
    deleteButton.classList.add("delete-button");
    deleteButton.ariaLabel = "Delete";

    li.append(checkboxInput, checkboxLabel, textLabel, deleteButton);
    DOM.todoListContainer.appendChild(li);

    internallyStoreTodo(todoText); // internal array updated
    saveTodos(); // call save form cleared

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

        //e.target.closest("li").id
        //not sure how to do this b/c id is Date.now != todo-STATE.todoCount
        //internallyRemoveTodo()
        //deleteTodo() or saveTodos()
    });
}

// INTERNAL STORAGE

/**
 * Update internal todosArray by pushing an object with the id, text, and checkboxState of user's most recently added todo
 * @param { string } todoText - The user-entered todo text.
 * @returns {void}
 */
export function internallyStoreTodo(todoText){

    const todo = {
        "id" : `todo-${Date.now()}`,
        "text" : todoText,
        "checkboxState" : false,
    }

    todosArray.push(todo);
}

/**
 * Update internal todosArray by removing an object with the matching id of the todo associated with user's most recently delete event
 * @param { string } id - The user-entered todo text.
 * @returns {void}
 */
export function internallyRemoveTodo(id){
    console.log("inside internallyRemoveTodo");
}

// LOCAL STORAGE

/**
 * Store the todosArray in local storage by converting (serializing) the array of JSON objects into a flat string
 * @returns {void}
 */
export function saveTodos(){
    const todosJSON = JSON.stringify(todosArray);
    localStorage.setItem("saved-todos", todosJSON);
}

/**
 * Retrieve the todos from local storage by converting (parsing) the flat string into an array of JSON objects 
 * @returns {Array} JSON.parse(todos) - array of todo JSON objects
 */
export function loadTodos(){
    // still need to add a call to buildTodos() ???
    const todos = localStorage.getItem("saved-todos") || "[]";
    return JSON.parse(todos);
}