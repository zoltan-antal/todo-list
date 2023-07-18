import Project from "./project";

const defaultProjectName = "Default";

export default class ProjectHandler {

  constructor() {
    const defaultProject = new Project(defaultProjectName);
    this.projectList = [defaultProject];
    this.currentProjectIndex = 0;
  }

  addProject(project) {
    this.projectList.push(project);
  }

  removeProject(id) {
    const index = this.projectList.findIndex(project => project.id === id);

    this.projectList.splice(index, 1);

    // If last project was removed, decrement the current project index
    if (index === (this.projectList.length)) {
      this.currentProjectIndex--;
    }
  }

  changeCurrentProject(id) {
    const index = this.projectList.findIndex(project => project.id == id);
    this.currentProjectIndex = index;
  }

  getProjectById(id) {
    for (const project of this.projectList) {
      if (project.id === id) {
        return project;
      }
    }
  }

  renameProjectById(id, newName) {
    for (const project of this.projectList) {
      if (project.id === id) {
        project.changeName(newName);
        return;
      }
    }
  }

  addTodo ({todo, projectId = this.projectList[this.currentProjectIndex].id}) {
    this.projectList.forEach(project => {
      if (project.id === projectId) {
        project.addTodo(todo);
      }
    })
  }
}
