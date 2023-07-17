import Todo from "./classes/todo";
import Project from "./classes/project";
import ProjectHandler from "./classes/project-handler";
import loadProjects from "./dom/handle-project-list";

export const projectHandler = new ProjectHandler;

export default function main() {
  const todoDialog = document.querySelector(".todo-dialog");
  const addTodoButton = document.querySelector(".add-todo");
  document.querySelectorAll("dialog .close").forEach(button => {
    button.addEventListener('click', () => {
      todoDialog.close();
    })
  })
  addTodoButton.addEventListener("click", () => {
    todoDialog.showModal();
  });
  
  projectHandler.addProject(new Project("Project A"));
  projectHandler.addProject(new Project("Project B"));
  loadProjects();
  
}
