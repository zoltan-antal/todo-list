import ProjectHandler from "./classes/project-handler";
import loadProjects from "./dom/handle-project-list";
import loadTodos from "./dom/handle-todo-list";
import demo from "./dom/demo";

export const projectHandler = new ProjectHandler;

export default function main() {
  demo();
  loadTodos();
  loadProjects();
}
