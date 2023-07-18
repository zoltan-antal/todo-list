import { projectHandler } from "../app";
import Project from "../classes/project";
import Todo from "../classes/todo";

export default function demo() {
  projectHandler.addProject(new Project("Project A"));
  projectHandler.addProject(new Project("Project B"));

  projectHandler.addTodo({todo: new Todo({
    title: "Task1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dueDate: {year: 2023, month: 8, day: 5},
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
    dueDate: {year: 2020, month: 1, day: 25},
    priority: "medium",
  }), projectId: 1});
}
