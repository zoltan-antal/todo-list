import { projectHandler } from "../app";
import circleOutlineImage from "../../assets/images/circle-outline.svg";
import checkCircleImage from "../../assets/images/check-circle.svg";
import flagVariantImage from "../../assets/images/flag-variant.svg"
import renameOutlineImage from "../../assets/images/rename-outline.svg";
import trashCanOutlineImage from "../../assets/images/trash-can-outline.svg";
import { format } from "date-fns";
import Todo from "../classes/todo";
import { storeProjectHandler } from "../storage/storage";

const todoListElement = document.querySelector(".main .todo-list");
const todoDialog = document.querySelector(".todo-dialog");
const addTodoButton = document.querySelector(".add-todo");

export default function loadTodos() {
  // Clear todo list
  clearTodos();

  // Add todos
  addTodos();
}

function clearTodos() {
  while (todoListElement.firstChild) {
    todoListElement.removeChild(todoListElement.lastChild);
  }
}

function addTodos() {
  const todoList = projectHandler.projectList[projectHandler.currentProjectIndex].todoList;
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    addTodo(todo);
  }
}

function addTodo(todo) {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo");
  if (todo.isComplete) {
    todoElement.classList.add("complete");
  }
  todoElement.setAttribute("todo-id", todo.id);

  const todoCheckElement = document.createElement("div");
  todoCheckElement.classList.add("todo-check");
  const todoUncheckedImage = document.createElement("img");
  todoUncheckedImage.src = circleOutlineImage;
  todoUncheckedImage.classList.add("unchecked");
  todoCheckElement.appendChild(todoUncheckedImage);
  const todoCheckedImage = document.createElement("img");
  todoCheckedImage.src = checkCircleImage;
  todoCheckedImage.classList.add("checked");
  todoCheckElement.appendChild(todoCheckedImage);
  addTodoCheckEvent(todoCheckElement);
  todoElement.appendChild(todoCheckElement);

  const todoTitleElement = document.createElement("h3");
  todoTitleElement.textContent = todo.title;
  todoTitleElement.classList.add("todo-title");
  todoElement.appendChild(todoTitleElement);

  if (todo.description) {
    const todoDescriptionElement = document.createElement("p");
    todoDescriptionElement.textContent = todo.description;
    todoDescriptionElement.classList.add("todo-description");
    todoElement.appendChild(todoDescriptionElement);
  }

  const todoInfosElement = document.createElement("div");
  todoInfosElement.classList.add("todo-infos");
  const todoDateElement = document.createElement("div");
  todoDateElement.classList.add("todo-info");
  todoDateElement.classList.add("date");
  const todoDatetimeElement = document.createElement("time");
  if (todo.dueDate) {
    todoDatetimeElement.dateTime = format(todo.dueDate, "yyyy-MM-dd");
    todoDatetimeElement.textContent = format(todo.dueDate, "yyyy-MM-dd");
  } else {
    todoDatetimeElement.dateTime = "";
    todoDatetimeElement.textContent = "no date set";
  }
  todoDateElement.appendChild(todoDatetimeElement);
  todoInfosElement.appendChild(todoDateElement);
  const todoPriorityElement = document.createElement("div");
  todoPriorityElement.classList.add("todo-info");
  todoPriorityElement.classList.add("priority");
  todoPriorityElement.classList.add(todo.priority);
  const todoPriorityImage = document.createElement("img");
  todoPriorityImage.src = flagVariantImage;
  todoPriorityElement.appendChild(todoPriorityImage);
  todoInfosElement.appendChild(todoPriorityElement);
  todoElement.appendChild(todoInfosElement);

  const todoButtonsElement = document.createElement("div");
  todoButtonsElement.classList.add("todo-buttons");
  const todoEditButtonElement = document.createElement("div");
  todoEditButtonElement.classList.add("todo-button");
  todoEditButtonElement.classList.add("edit");
  const todoEditButtonImage = document.createElement("img");
  todoEditButtonImage.src = renameOutlineImage;
  todoEditButtonElement.appendChild(todoEditButtonImage);
  addTodoEditEvent(todoEditButtonElement);
  todoButtonsElement.appendChild(todoEditButtonElement);
  const todoDeleteButtonElement = document.createElement("div");
  todoDeleteButtonElement.classList.add("todo-button");
  todoDeleteButtonElement.classList.add("delete");
  const todoDeleteButtonImage = document.createElement("img");
  todoDeleteButtonImage.src = trashCanOutlineImage;
  todoDeleteButtonElement.appendChild(todoDeleteButtonImage);
  addTodoDeleteEvent(todoDeleteButtonElement);
  todoButtonsElement.appendChild(todoDeleteButtonElement);
  todoElement.appendChild(todoButtonsElement);

  todoListElement.appendChild(todoElement);
}

function removeTodo(todoId) {
  for (const todoElement of todoListElement.childNodes) {
    if (Number(todoElement.getAttribute("todo-id")) === todoId) {
      todoElement.remove();
      return;
    }
  }

  // Update stored project handler
  storeProjectHandler();
}

function addTodoCheckEvent(todoCheckElement) {
  todoCheckElement.addEventListener("click", (e) => {
    let todoElement = e.target;

    // Getting the correct todo target element
    while (!todoElement.classList.contains("todo")) {
      todoElement = todoElement.parentElement;
    }

    // Toggle complete status on Todo object
    projectHandler.getCurrentProject().toggleTodoCompleteStatusById(Number(todoElement.getAttribute("todo-id")));

    // Toggling class on todo element
    todoElement.classList.toggle("complete");
  })
}

function addTodoEditEvent(todoCheckElement) {
  todoCheckElement.addEventListener("click", (e) => {
    let todoElement = e.target;

    // Getting the correct todo target element
    while (!todoElement.classList.contains("todo")) {
      todoElement = todoElement.parentElement;
    }

    // Getting todo ID and todo
    const todoId = Number(todoElement.getAttribute("todo-id"));
    const todo = projectHandler.getCurrentProject().getTodoById(todoId);

    // Showing dialog
    resetTodoDialog();
    todoDialog.querySelector(".title").textContent = "Edit task";
    todoDialog.showModal();

    // Pre-populating form fields with todo's properties
    todoDialog.querySelector("#todo-title").value = todo.title;
    todoDialog.querySelector("#todo-description").textContent = todo.description;
    if (todo.dueDate) {
      todoDialog.querySelector("#todo-date").value = format(todo.dueDate, "yyyy-MM-dd");
    }
    todoDialog.querySelector("#todo-priority").value = todo.priority;

    // Adding new event listener to submit button
    todoDialog.querySelector("button.submit").addEventListener("click", () => editTodo(todoElement));
  })
}

function addTodoDeleteEvent(todoCheckElement) {
  todoCheckElement.addEventListener("click", (e) => {
    let todoElement = e.target;

    // Getting the correct todo target element
    while (!todoElement.classList.contains("todo")) {
      todoElement = todoElement.parentElement;
    }

    // Getting todo ID
    const todoId = Number(todoElement.getAttribute("todo-id"));

    // Deleting todo from the todo list
    projectHandler.getCurrentProject().removeTodo(todoId);

    // Deleting todo element from the DOM
    removeTodo(todoId);

    // Re-loading todo list
    loadTodos();
  })
}

function resetTodoDialog() {
  // Resetting form
  const todoForm = todoDialog.querySelector("form");
  todoForm.reset();

  const todoFormTextareas = todoForm.querySelectorAll(".textarea");
  todoFormTextareas.forEach(todoFormTextArea => {
    todoFormTextArea.textContent = "";
  })

  const todoFormGroups = todoForm.querySelectorAll(".form-group");
  todoFormGroups.forEach(todoFormGroup => {
    todoFormGroup.classList.remove("warning");
  })

  // Removing any event listeners from submit button
  const todoDialogSubmitButton = todoDialog.querySelector("button.submit");
  const todoDialogSubmitButtonClone = todoDialogSubmitButton.cloneNode(true);
  todoDialogSubmitButton.parentNode.replaceChild(todoDialogSubmitButtonClone, todoDialogSubmitButton);
}

function createNewTodo() {
  // Checking if all required fields are filled
  if (!requiredFieldsFilled()) {
    return;
  }

  // Reading values from the form
  const title = todoDialog.querySelector("#todo-title").value;
  const description = todoDialog.querySelector("#todo-description").textContent ? todoDialog.querySelector("#todo-description").textContent : undefined;
  const dueDate = todoDialog.querySelector("#todo-date").value ? new Date(todoDialog.querySelector("#todo-date").value) : undefined;
  const priority = todoDialog.querySelector("#todo-priority").value;

  // Creating new Todo object and adding it to the current project
  const todo = new Todo({title, description, dueDate, priority});
  projectHandler.getCurrentProject().addTodo(todo);

  // Update stored project handler
  storeProjectHandler();

  // Closing and resetting dialog
  todoDialog.close();
  resetTodoDialog();

  // Re-loading todo list
  loadTodos();
}

function editTodo(todoElement) {
  // Checking if all required fields are filled
  if (!requiredFieldsFilled()) {
    return;
  }

  // Getting todo ID and todo
  const todoId = Number(todoElement.getAttribute("todo-id"));
  const todo = projectHandler.getCurrentProject().getTodoById(todoId);

  // Reading values from the form
  const title = todoDialog.querySelector("#todo-title").value;
  const description = todoDialog.querySelector("#todo-description").textContent ? todoDialog.querySelector("#todo-description").textContent : undefined;
  const dueDate = todoDialog.querySelector("#todo-date").value ? new Date(todoDialog.querySelector("#todo-date").value) : undefined;
  const priority = todoDialog.querySelector("#todo-priority").value;

  // Updating Todo object
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;

  // Update stored project handler
  storeProjectHandler();

  // Closing and resetting dialog
  todoDialog.close();
  resetTodoDialog();

  // Re-loading todo list
  loadTodos();
}

function requiredFieldsFilled() {
  const requiredElements = todoDialog.querySelectorAll(":required");
  let allFilled = true;

  requiredElements.forEach(element => {
    if (!element.value) {
      allFilled = false;
      element.parentNode.classList.add("warning");
    }
  })

  return allFilled;
}

document.querySelectorAll("dialog .close").forEach(button => {
  button.addEventListener('click', () => {
    todoDialog.close();
    resetTodoDialog();
  })
})

addTodoButton.addEventListener("click", () => {
  resetTodoDialog();
  todoDialog.querySelector(".title").textContent = "New task";
  todoDialog.querySelector("button.submit").addEventListener("click", createNewTodo);
  todoDialog.showModal();
});
