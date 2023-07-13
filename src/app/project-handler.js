import Project from "./project";

const defaultProjectName = "Default";

export default class ProjectHandler {

  constructor() {
    const defaultProject = new Project(defaultProjectName);
    this.projectList = [defaultProject];
  }

  addProject(project) {
    this.projectList.push(project);
  }

  removeProject(id) {
    const index = this.projectList.findIndex(project => project.id === id);
    this.projectList.splice(index, 1);
  }

}
