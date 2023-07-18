import { projectHandler } from "../app";
import { defaultProjectName } from "../classes/project-handler";
import Project from "../classes/project";
import Todo from "../classes/todo";
import loadProjects from "./handle-project-list";
import loadTodos from "./handle-todo-list";

export default function demo() {
  resetProjectHandler();

  const projectA = new Project("Project A");
  const projectB = new Project("Project B");
  projectHandler.addProject(projectA);
  projectHandler.addProject(projectB);

  projectHandler.addTodo({todo: new Todo({
    title: "Task1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dueDate: new Date(2023, 8, 5),
    priority: "high",
  })});
  projectHandler.addTodo({todo: new Todo({
    title: "Task3",
    description: "Something something",
    priority: "low",
    isComplete: true,
  })});
  projectHandler.addTodo({todo: new Todo({
    title: "Task2",
    dueDate: new Date(2020, 1, 25),
    priority: "medium",
  }), projectId: projectA.id});

  loadProjects();
  loadTodos();
}

function resetProjectHandler() {
  projectHandler.projectList = [];
  projectHandler.addProject(new Project(defaultProjectName));
  projectHandler.currentProjectIndex = 0;
}
