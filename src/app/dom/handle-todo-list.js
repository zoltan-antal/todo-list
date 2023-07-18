import { projectHandler } from "../app";
import circleOutlineImage from "../../assets/images/circle-outline.svg";
import checkCircleImage from "../../assets/images/check-circle.svg";
import flagVariantImage from "../../assets/images/flag-variant.svg"
import renameOutlineImage from "../../assets/images/rename-outline.svg";
import arrowRightCircleOutlineImage from "../../assets/images/arrow-right-circle-outline.svg";
import trashCanOutlineImage from "../../assets/images/trash-can-outline.svg";
import { getDate, getMonth, getYear, format } from "date-fns";

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
  const todoMoveButtonElement = document.createElement("div");
  todoMoveButtonElement.classList.add("todo-button");
  todoMoveButtonElement.classList.add("move");
  const todoMoveButtonImage = document.createElement("img");
  todoMoveButtonImage.src = arrowRightCircleOutlineImage;
  todoMoveButtonElement.appendChild(todoMoveButtonImage);
  addTodoMoveEvent(todoMoveButtonElement);
  todoButtonsElement.appendChild(todoMoveButtonElement);
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

function addTodoCheckEvent(todoCheckElement) {
  
}

function addTodoEditEvent(todoCheckElement) {
  
}

function addTodoMoveEvent(todoCheckElement) {
  
}

function addTodoDeleteEvent(todoCheckElement) {
  
}

document.querySelectorAll("dialog .close").forEach(button => {
  button.addEventListener('click', () => {
    todoDialog.close();
  })
})

addTodoButton.addEventListener("click", () => {
  todoDialog.showModal();
});