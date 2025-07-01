import { DOM } from "./dom.js";

let allTodos = [];

export function test() {
    DOM.formContainer.addEventListener("submit", function(e){
        alert("form submitted");
    })
}