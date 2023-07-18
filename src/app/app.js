import ProjectHandler from "./classes/project-handler";
import initializePage from "./dom/initialize-page";
import loadProjects from "./dom/handle-project-list";
import loadTodos from "./dom/handle-todo-list";
import demo from "./dom/demo";

export const projectHandler = new ProjectHandler;

export default function main() {
  initializePage();
  loadTodos();
  loadProjects();
}
