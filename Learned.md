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

### 5. addEventListener
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    - addEventListener(type, listener, options){}
        - string representing the event type to listen for
        - object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs.
        - object that specifies characteristics about the event listener

- https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement#events
    - The submit event fires when a form is submitted.



What's the difference between live and not live collection in Javascript selectors?
https://stackoverflow.com/questions/32486199/whats-the-difference-between-live-and-not-live-collection-in-javascript-selecto
http://www.w3.org/TR/dom/#concept-collection
document.getElementsByClassName()
document.getElementsByTagName()
document.getElementsByName()

are live because they are observers of internal collections maintained by engines. That maintenance is not strictly required but is easy to achieve.

document.querySelectorAll() 

is not live because result gets computed each time you request it. Maintenance of live collection is too expensive as each modification (content, attributes, classes) of the DOM in this case will require re-evaluation of each element in the collection - O(N*M) task where N is the number of all elements in the DOM (worst case) and M number of active querySelectorAll() collections.   

