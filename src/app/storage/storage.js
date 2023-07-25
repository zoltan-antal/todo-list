import { projectHandler } from "../app";
import Project from "../classes/project";
import ProjectHandler from "../classes/project-handler";
import Todo from "../classes/todo";

export function storeProjectHandler() {
  localStorage.setItem("projectHandler", JSON.stringify(projectHandler));

  // Store class static variables
  localStorage.setItem("projectNextId", Project.nextId);
  localStorage.setItem("todoNextId", Todo.nextId);

  console.log(Project.nextId);
  console.log(Todo.nextId);
  console.log(projectHandler);
}

export function retrieveProjectHandler() {
  let projectHandler;

  // Initialise storage values if no stored values are detected
  if (!localStorage.getItem("projectHandler")) {
    Project.nextId = 0;
    Todo.nextId = 0;
    projectHandler = new ProjectHandler();
    return projectHandler;
  }

  // Retrieve stored project handler and restore class methods etc.
  projectHandler = JSON.parse(localStorage.getItem("projectHandler"));
  Object.setPrototypeOf(projectHandler, ProjectHandler.prototype);
  projectHandler.projectList.forEach(project => {
    Object.setPrototypeOf(project, Project.prototype);
    project.todoList.forEach(todo => {
      Object.setPrototypeOf(todo, Todo.prototype);
      todo.dueDate = todo.dueDate ? new Date(todo.dueDate) : undefined;
    });
  });
  // Restore starting project view to project 0
  projectHandler.currentProjectIndex = 0;

  // Restore class static variables
  Project.nextId = localStorage.getItem("projectNextId");
  Todo.nextId = localStorage.getItem("todoNextId");

  console.log(Project.nextId);
  console.log(Todo.nextId);
  console.log(projectHandler);

  return projectHandler;
}
