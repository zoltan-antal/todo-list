import initializePage from "./dom/initialize-page";
import loadProjects from "./dom/handle-project-list";
import loadTodos from "./dom/handle-todo-list";
import { retrieveProjectHandler } from "./storage/storage";

export const projectHandler = retrieveProjectHandler();

export default function main() {
  initializePage();
  loadProjects();
  loadTodos();
}
