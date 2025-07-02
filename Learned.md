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
- **Failed Approach**: classList.add("className") returns undefined (it modifies the element in place), breaking the chain
    - example: let li = document.createElement("li").classList.add("todo-list-bullets-container"); // undefined (not the <li> element)

- **Correct Approach 1**: You must separate creation and class addition or chain to a property that returns the element:
    - example: li.classList.add("todo-list-bullets-container");

- **Correct Approach 2**: Or, if you want chaining, use a method that returns the element, like setAttribute:
    - classList.add is preferred over setAttribute for safety (avoids overwriting classes).
    - example: li.setAttribute("class", "todo-list-bullets-container"); // Returns l

### 3. Option B is Faster
- Both work to assign attributes to html element created in JScript    
    - let checkboxInput = document.createElement("input");

- **Option A**:
    - Object.assign(checkboxInput, {className: "text-input", type: "checkbox", id: `todo-${STATE.todoCount}`});
    
- **Option B**:
    - checkboxInput.id = `todo-${STATE.todoCount}`;
    - checkboxInput.classList.add("text-input");
    - checkboxInput.type = "checkbox";

### 4. Aria labels
since checkbox is hidden (display: none in CSS), consider adding aria-hidden="true" 
- if relying on the custom label for accessibility:
- if the custom checkbox (checkboxLabel) fully handles accessibility.
