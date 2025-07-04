/** @module Event handling for Todo application */

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