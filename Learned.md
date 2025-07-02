### 1. .className vs .classList
- **li.className** = "todo-list-bullets-container": 
    - li.className = "todo-list-bullets-container"; // Replaces all classes
    - Sets the entire class string, overwriting any existing classes. 
    - Single assignment and suitable when you know the element has no other classes.

- **li.classList**.add("todo-list-bullets-container"): 
    -li.classList.add("todo-list-bullets-container"); // Adds to existing classes
    - Adds a class to the element’s class list without overwriting existing classes. 
    - Safer for elements that may have multiple classes.

### 2. Can't chain .classList
- classList.add("className") returns undefined (it modifies the element in place), breaking the chain
- example:
    let li = document.createElement("li").classList.add("todo-list-bullets-container");
    console.log(li); // undefined (not the <li> element)

### 3. Aria labels
since checkbox is hidden (display: none in CSS), consider adding aria-hidden="true" 
- if relying on the custom label for accessibility:
- if the custom checkbox (checkboxLabel) fully handles accessibility.
