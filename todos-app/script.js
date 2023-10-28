const inputBox = document.querySelector(".input-box");
const addBtn = document.querySelector(".add-button");
const todo_list = document.querySelector(".todo-list");

let editTodo = null;

// click add button then task added
addBtn.addEventListener("click", function () {
  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("you must write something in your to do");
    return false;
  }

  if (addBtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    todo_list.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
});

// update
todo_list.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Remove") {
    todo_list.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
});

// save the localstorage
function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get todos in localstorage
document.addEventListener("DOMContentLoaded", function getLocalTodos() {
  let todos;

  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "editBtn");
      editBtn.innerText = "Edit";
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "deleteBtn");
      deleteBtn.innerText = "Remove";
      li.appendChild(deleteBtn);

      todo_list.appendChild(li);
    });
  }
});

// remove todo in localstorage
function deleteLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);

  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// edit todo in localstorage
function editLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);

  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
}
