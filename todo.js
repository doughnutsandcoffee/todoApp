import { DOM } from "./dom.js";

let allTodos = [];

export function test() {

    /* 
        https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        addEventListener(type, listener, options){}

        string representing the event type to listen for
        object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs.
        object that specifies characteristics about the event listener

        https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#events
        The submit event fires when a form is submitted.
    */
   
    let userInput = ""; // need text outside function
    let count = -1; // track elements
    DOM.formContainer.addEventListener("submit", function(e){
        count++; 

        // only capture text on "submit" ... guessing b/c clear after
        userInput = DOM.todoInput.value;
        // console.log(`user Input: ${userInput}`);

        // clicked "add" button
        e.preventDefault(); // !!! important !!!

        // add text to UL
        let li = document.createElement("li") //.classList.add("todo-list-bullets-container");
        Object.assign(li, {className: "todo-list-bullets-container"});

        // classList.add("text-input"); returns undefined
        let inputCheckbox = document.createElement("input");
        Object.assign(inputCheckbox, {className: "text-input", type: "checkbox", id: `todo-${count}`});
        
        let labelCheckbox = document.createElement("label");
        Object.assign(labelCheckbox, {className: "custom-checkbox", htmlFor: `todo-${count}`});

        let imgCheckbox = document.createElement("img");
        Object.assign(imgCheckbox, {src: "images/check.svg", alt: "checkbox"});
        labelCheckbox.appendChild(imgCheckbox);
        
        let labelTodoText = document.createElement("label");
        Object.assign(labelTodoText, {className: "todo-text", htmlFor: `todo-${count}`});
        
        let todoText = document.createElement("p");
        todoText.textContent = userInput;
        labelTodoText.appendChild(todoText);

        let deleteButton = document.createElement("button");
        Object.assign(deleteButton, {id: "delete-btn", className: "delete-button", "aria-label": "Delete"});

        li.append(inputCheckbox, labelCheckbox, labelTodoText, deleteButton);
        DOM.todoListContainer.appendChild(li);

        DOM.todoInput.value = "";     // clear input
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