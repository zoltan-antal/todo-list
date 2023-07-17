const todoDialog = document.querySelector(".todo-dialog");
const addTodoButton = document.querySelector(".add-todo");

export default function loadTodos() {
  document.querySelectorAll("dialog .close").forEach(button => {
    button.addEventListener('click', () => {
      todoDialog.close();
    })
  })
  addTodoButton.addEventListener("click", () => {
    todoDialog.showModal();
  });
}

