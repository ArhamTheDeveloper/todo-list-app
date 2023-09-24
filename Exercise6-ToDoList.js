let todos = [];
let createTodoButton = document.getElementById("btn-create-todo");
let todoInput = document.getElementById("input-todo");
let addTodoButton = document.getElementById("btn-add-todo");

// Define the addTodo function first
function addTodo() {
  const inputStr = todoInput.value.trim();
  if (inputStr !== "") {
    createAndAppendTodoElements(inputStr);

    todos.push(inputStr);
    localStorage.setItem("Todos", JSON.stringify(todos));

    todoInput.value = "";
  }
}

createTodoButton.addEventListener("click", () => {
  todoInput.style.visibility = "visible";
  addTodoButton.style.visibility = "visible";
});

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

addTodoButton.addEventListener("click", () => {
  addTodo();
});

function createAndAppendTodoElements(inputStr) {
  const paragraph = document.createElement("p");
  paragraph.textContent = inputStr;

  const buttonsContainer = document.createElement("div");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  document.body.append(paragraph);
  paragraph.append(buttonsContainer);
  buttonsContainer.append(editButton);
  buttonsContainer.append(deleteButton);
  // Yahan tak paragraph aur paragraphButtons create aur append ho gaye aur paragraph ka text content inputStr set bhi set hogaya

  // Adding functionality to Edit button Editing Menu Opens
  editButton.addEventListener("click", () => {
    let originalText = paragraph.textContent;

    var buttonText = Array.from(paragraph.querySelectorAll("button")).map(
      (button) => button.textContent
    );
    for (var i = 0; i < buttonText.length; i++) {
      originalText = originalText.replace(buttonText[i], "");
    }

    const editText = document.createElement("input");
    editText.classList.add("editingInput")
    console.log(editText);
    editText.type = "text";
    editText.value = originalText;
    paragraph.textContent = "";
    paragraph.appendChild(editText);

    // Creating and Appending Editing buttons
    const editingButtonsContainer = document.createElement("div");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-button");

    paragraph.append(editingButtonsContainer);
    editingButtonsContainer.appendChild(cancelButton);
    editingButtonsContainer.appendChild(saveButton);

    // Adding functionality to Save button
    saveButton.addEventListener("click", () => {
      const editedText = editText.value.trim();
      if (editedText !== "") {
        paragraph.textContent = editedText;
        const todoIndex = todos.indexOf(originalText);
        if (todoIndex !== -1) {
          todos[todoIndex] = editedText;
          localStorage.setItem("Todos", JSON.stringify(todos));
        }
      }
      else{
        paragraph.remove();
        const todoIndex = todos.indexOf(inputStr);
        if (todoIndex !== -1) {
          todos.splice(todoIndex, 1);
          localStorage.setItem("Todos", JSON.stringify(todos));
        }
      }
      paragraph.append(buttonsContainer);
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);
    });

    // Adding functionality to Cancel button
    cancelButton.addEventListener("click", () => {
      paragraph.removeChild(editText);
      paragraph.removeChild(editingButtonsContainer);

      paragraph.textContent = originalText;

      paragraph.append(buttonsContainer);
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);
    });
  });
// Editing Menu CLosed

  // Adding functionality to Delete button
  deleteButton.addEventListener("click", () => {
    paragraph.remove();
    const todoIndex = todos.indexOf(inputStr);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      localStorage.setItem("Todos", JSON.stringify(todos));
    }
  });
}

// Function to load and display todos from localStorage
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("Todos");

  if (savedTodos) {
    const todosArray = JSON.parse(savedTodos);

    // Loop through the saved todos and display them
    todosArray.forEach((todoText) => {
      createAndAppendTodoElements(todoText);
      todos.push(todoText);
    });
  }
}

loadTodosFromLocalStorage();
