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

### 6. With and With out template literals
- If you have an object:
    - With template literal: string 
        - console.log(`todo: ${todo}`);
        - [object Object]   
    - With Out template literal: value
        - console.log("todo:", todo);
        - {"id": "1751919833890","text": "todo00","checkboxState": true}

### 7. What's the difference between live and not live collection in Javascript selectors?
    https://stackoverflow.com/questions/32486199/whats-the-difference-between-live-and-not-live-collection-in-javascript-selecto
    http://www.w3.org/TR/dom/#concept-collection
    document.getElementsByClassName()
    document.getElementsByTagName()
    document.getElementsByName()

    are live because they are observers of internal collections maintained by engines. That maintenance is not strictly required but is easy to achieve.

    document.querySelectorAll() 

    is not live because result gets computed each time you request it. Maintenance of live collection is too expensive as each modification (content, attributes, classes) of the DOM in this case will require re-evaluation of each element in the collection - O(N*M) task where N is the number of all elements in the DOM (worst case) and M number of active querySelectorAll() collections.   

### 8. Local Storage - data stored on your browser
- Resources:
    - [x][The Coding Train - Local Storage in JavaScript with p5.js](https://www.youtube.com/watch?v=_SRS8b4LcZ8)
    - [x][Chrome for Developers -  Storage for the web](https://www.youtube.com/watch?v=NNuTV-gjlZQ/)
    - [x][Web.Dev -  Storage for the web](https://web.dev/articles/storage-for-the-web)
    - [x][Chrome Web Storage and Quota Concepts](https://docs.google.com/document/d/19QemRTdIxYaJ4gkHYf2WWBNPbpuZQDNMpUVf8dQxj4U/preview?tab=t.0#heading=h.nij5cwyctzt0)
    - [ ][A Primer on the Different Types of Browser Storage](https://css-tricks.com/a-primer-on-the-different-types-of-browser-storage/)
    - [ ][Medium - 6 Chrome Storage Options](https://medium.com/@letscodefuture/6-chrome-storage-options-must-read-if-you-are-a-developer-2ab7aa02dede)
    - [x][MDN Web Docs - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

- Web Storage Interfaces:
    - Storage object: used to set, retrieve and remove data for a specific domain and storage type, current origin's: 
        - (a) session storage
        - (b) local storage

    - Web Storage API extends the Window object with two new properties:
        - Window.sessionStorage: read-only property access session Storage object for current origin
            - partioned by origin and browser tabs
            - data cleared when page session ends

        - Window.localStorage: read-only property access local Storage object for document's origin,
            - partioned by origin, same if match: scheme (protocol) + hostname (domain) | filepath (/app1/index.html) doesn't matter
                - scheme (http/https) + hostname (google.com)
            - stored data is saved across browser sessions
            - data persists except: in "private browsing" or "ingonito" cleared when last "private" tab closed

    - Storage Event:
        - fired on a document's Window object when a storage area changes.

- Basic Functions:
    - get specific item from storage:
        - Storage.getItem("key");

    - add or update specific item into storage:
        - Storage.setItem("key", "value");
        - Storage["key"] = "value";
        - Storage.key = "value";

    - remove specific item from storage:
        - Storage.removeItem("key");

    - removing all localStorage:
        - Storage.clear();

    - to store data (convert data into string):
        - JSON.stringify("key"):

    - retrive stored data:
        - JSON.parse("key")

- Summary:
    - Comes with Javascript from a Browser API, the Web Storage API, specifically the browser window object
    - Web Storage API allows storage of data in format of: a Javascript Object {"key" : value}
    - Storage is persitent across all session until explicitly cleared (doesn't expire when web browser is closed/refreshed)
    - Access it using: Developer Tools (Right "click" Inspect) > Application > Storage > Local Storage
    - Good: Quick solution for obtaining persistence w/o worrying about extra asynchronous code and data
    - Bad: Limited to browser disk space preset allocation, data stored in plain text, and synchronous execution can block main thread

- Types of Storage: Developer Tools (Right "click" Inspect) > Application > Storage > Local Storage
    - Local storage (sync) ........... ~05MB only stores strings !unencrypted in plain-text BUT persists even when browser is closed/reopened
    - Session storage (sync) ......... ~05MB stores tab specific info for duration of page session/lifetime of tab, (only stores strings) 
    - Extension storage (sync) ....... ~??MB
    - IndexedDB (async) .............. ~??MB DB stores structured data via indexes
    - Cookies storage (async) ........ ~??MB shared btwn browser && server not for user storage! sent w/ea. HTTP request, only stores strings
    - Private state tokens (async) ... ~??MB
    - Interest groups (async) ........ ~??MB
    - Shared storage (async) ......... ~??MB
    - Cache storage (async) .......... ~??MB cache network requests and responses
    - Storage buckets (async) ........ ~??MB
    - ? File System Access API
    - ? File System API (asnyc)

- Different Browsers:
    - Chrome: ~?GB
        - browser allocated up to 80% of total disk space.
        - origin can use up to 60% of the total disk space.
 
    - Firefox: ~2GB
        - browser allocated up to 50% of total disk space.

    - Safari (desktop and mobile): ~1GB+
        - browser allocated up to 1GB.
        - at limit, user prompted -> inc. limit in 0.2GB increments

- How to do this in my project:
    * localStorage operations are slower than in-memory array operations (if use internalArray)
    0. B/C local storage only stores strings
        - data type problem: can't just store HTMLCollection (live: reflect DOM changes)
        - data type solution: store as string content using Web Browser API function Storage.JSON().stringify();
            - can't store HTML
            - store string data necessary to call buildTodo() to recreate same <li> elements again:
                - id, user-text, state-of-checkbox

        - timing problem: todo's are <li> elements that are **null**, until user adds data via "add" form submission event
        - timing solution: convert to JSON same time user "add", update on "delete" using object unique id
            - could use something like a counter variable or built-in Date.now()
            - state.js already have counter: STATE.todoCount
            - id = `todo-${STATE.todoCount}`

    1. Get the parent html element we are adding: <li>
    2. Extract data by creating an object: objectName = { "variableName": "html" }
    3. Convert to JSON: JSON.stringify(objectName)
    4. Store object in local storage using a key|value : localStorage.setItem("objectKey":"objectName")
    5. Retrieve: const storedTodo = JSON.parse(localStorage.getItem('todo'));

### 9. Stringify does it all
    - JSON.stringify(todosArray)
        - Don't need to save objects as strings function does this already
        - Unless you want to be save store all as strings for Type Safety, which is what I did
        - b/c function inside buildTodo() to produce id's is of type number: const timestamp = Date.now();
        - so:
            export function internallyStoreTodo(timestamp, todoText, state){
                const todo = {
                    "id" : `${timestamp}`, // added id to li ... match
                    "text" : todoText,
                    "checkboxState" : state,
                }
                todosArray.push(todo);
            }
        - why needed to use template literal, to have accurate comparison and avoid undefined in handleCheckbox():
            - const todo = todosArray.find(todo => todo.id === `${targetID}`);  

### 10. Storage hole
    - Fixed issues of disspearing todo's
    - Added these lines at bottom of renderTodos(todo):     
        - internallyStoreTodo(todo.id, todo.text, todo.checkboxState); 
        - writeToLocalStorage();  
    - loadTodos(): renders data from localStorage onto page
    - Creates a hole b/c todosArray is never updated, like they never existed
    - handleAdd(): user inputs data -> buildTodos(), todosArray updated -> used to overwrite to localStorage
    - old todo's were never account for w/o adding lines to save them in renderTodos(todo)

    - Now it works
        - No need for writeToLocalStorage() in renderTodo: Unnecessary since it redundantly saves unchanged data.
        - Page load: loadTodos() retrieves todos from localStorage, calling renderTodo for each.
        - Storing in todosArray: renderTodo calls internallyStoreTodo, populating todosArray.
        - Sync at load: todosArray and localStorage are synced after loadTodos().
        - Adding todos: handleAdd() calls buildTodo, updating todosArray and calling writeToLocalStorage.
        - Persistent storage: writeToLocalStorage in buildTodo saves todosArray (loaded + new todos) to localStorage.