import Todo from "./todo";
import Project from "./project";
import ProjectHandler from "./project-handler";

const projectHandler = new ProjectHandler;

export default function main() {
  const addTodoDialog = document.querySelector(".todo-dialog");
  const addTodoButton = document.querySelector(".add-todo");
  addTodoButton.addEventListener("click", () => {
    addTodoDialog.showModal();
  });


}
