import { projectHandler } from "../app";
import Project from "../classes/project";

export default function demo() {
  projectHandler.addProject(new Project("Project A"));
  projectHandler.addProject(new Project("Project B"));
}
