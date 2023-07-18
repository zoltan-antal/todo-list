import { projectHandler } from "../app";
import renameOutlineImage from "../../assets/images/rename-outline.svg";
import trashCanOutlineImage from "../../assets/images/trash-can-outline.svg";
import checkImage from "../../assets/images/check.svg";
import closeImage from "../../assets/images/close.svg";
import Project from "../classes/project";
import loadTodos from "./handle-todo-list";

const projectListElement = document.querySelector(".sidebar .project-list");
const addProjectElement = document.querySelector(".sidebar .add-project");
const todoTitleElement = document.querySelector(".main .title");

export default function loadProjects() {
  // Clear project list
  clearProjects();

  // Add projects
  addProjects();
}

function clearProjects() {
  while (projectListElement.firstChild) {
    projectListElement.removeChild(projectListElement.lastChild);
  }
}

function addProjects() {
  for (let i = 0; i < projectHandler.projectList.length; i++) {
    const project = projectHandler.projectList[i];
    // Currently selected project needs to be selected
    if (projectHandler.currentProjectIndex === i) {
      addProject({project, toSelect: true});
      continue;
    }
    addProject({project});
  }
}

function addProject({project, toSelect = false}) {
  const projectElement = document.createElement("li");
  projectElement.classList.add("project");
  projectElement.setAttribute("project-id", project.id);

  const projectTitleElement = document.createElement("h3");
  projectTitleElement.classList.add("project-title");
  projectTitleElement.textContent = project.name;
  projectElement.appendChild(projectTitleElement);
  
  addProjectSelectEvent(projectElement);
  
  projectListElement.appendChild(projectElement);

  if (toSelect) {
    selectProject(projectElement);
  }
}

function removeProject(projectId) {
  for (const projectElement of projectListElement.childNodes) {
    if (Number(projectElement.getAttribute("project-id")) === projectId) {
      projectElement.remove();
      return;
    }
  }
}

function selectProject(projectElement) {
  // Checking if project is already selected
  if (projectElement.classList.contains("selected")) {
    return;
  }

  // Unselecting previously selected project and removing buttons
  unselectProjects();

  // Marking project as selected and adding buttons
  projectElement.classList.add("selected");
  addProjectSelectButtons(projectElement);

  // Displaying Todo list
  todoTitleElement.textContent = projectHandler.getProjectById(Number(projectElement.getAttribute("project-id"))).name;
  loadTodos();
}

function unselectProjects() {
  projectListElement.childNodes.forEach(projectElement => {
    projectElement.classList.remove("selected");
    projectElement.childNodes.forEach(element => {
      if (element.classList.contains("project-buttons")) {
        element.remove();
      }
    });
  });
}

function addProjectSelectButtons(projectElement) {
  const projectButtonsElement = document.createElement("div");
  projectButtonsElement.classList.add("project-buttons");

  const projectButtonRenameElement = document.createElement("div");
  projectButtonRenameElement.classList.add("project-button");
  projectButtonRenameElement.classList.add("rename");
  const projectButtonRenameImage = document.createElement("img");
  projectButtonRenameImage.src = renameOutlineImage;
  projectButtonRenameElement.appendChild(projectButtonRenameImage);
  addProjectRenameEvent(projectButtonRenameElement);
  
  const projectButtonDeleteElement = document.createElement("div");
  projectButtonDeleteElement.classList.add("project-button");
  projectButtonDeleteElement.classList.add("delete");
  const projectButtonDeleteImage = document.createElement("img");
  projectButtonDeleteImage.src = trashCanOutlineImage;
  projectButtonDeleteElement.appendChild(projectButtonDeleteImage);
  addProjectDeleteEvent(projectButtonDeleteElement);

  projectButtonsElement.appendChild(projectButtonRenameElement);
  projectButtonsElement.appendChild(projectButtonDeleteElement);
  projectElement.appendChild(projectButtonsElement);
}

function addProjectEditButtons(projectElement) {
  const projectButtonsElement = document.createElement("div");
  projectButtonsElement.classList.add("project-buttons");

  const projectButtonConfirmElement = document.createElement("div");
  projectButtonConfirmElement.classList.add("project-button");
  projectButtonConfirmElement.classList.add("confirm");
  const projectButtonConfirmImage = document.createElement("img");
  projectButtonConfirmImage.src = checkImage;
  projectButtonConfirmElement.appendChild(projectButtonConfirmImage);
  addProjectConfirmEvent(projectButtonConfirmElement);
  
  const projectButtonCancelElement = document.createElement("div");
  projectButtonCancelElement.classList.add("project-button");
  projectButtonCancelElement.classList.add("cancel");
  const projectButtonCancelImage = document.createElement("img");
  projectButtonCancelImage.src = closeImage;
  projectButtonCancelElement.appendChild(projectButtonCancelImage);
  addProjectCancelEvent(projectButtonCancelElement);

  projectButtonsElement.appendChild(projectButtonConfirmElement);
  projectButtonsElement.appendChild(projectButtonCancelElement);
  projectElement.appendChild(projectButtonsElement);
}

function removeProjectButtons(projectElement) {
  projectElement.childNodes.forEach(element => {
    if (element.classList.contains("project-buttons")) {
      element.remove();
    }
  });
}

function addProjectTitleInput({projectElement, value = ""}) {
  const projectTitleInputElement = document.createElement("input");
  projectTitleInputElement.value = value;
  projectTitleInputElement.type = "text";
  projectTitleInputElement.classList.add("project-title-input");
  projectElement.appendChild(projectTitleInputElement);
}

function addProjectSelectEvent(projectElement) {
  projectElement.addEventListener("click", (e) => {
    let projectElement = e.target;

    // Exiting if a project button was pressed
    if (projectElement.classList.contains("project-button") || projectElement.tagName == "IMG") {
      return;
    }

    // Getting the correct project target element (in case title is clicked)
    while (!projectElement.classList.contains("project")) {
      projectElement = projectElement.parentElement;
    }

    projectHandler.changeCurrentProject(Number(projectElement.getAttribute("project-id")));
    selectProject(projectElement);
  });
}

function addProjectRenameEvent(projectButtonElement) {
  projectButtonElement.addEventListener("click", (e) => {
    // Getting the correct project target element
    let projectElement = e.target;
    while (!projectElement.classList.contains("project")) {
      projectElement = projectElement.parentElement;
    }

    // Removing event listeners from all other projects to deactivate them
    removeProjectEvents({projectElementSkip: projectElement});

    // Removing project select buttons
    removeProjectButtons(projectElement);

    // Marking project as being edited
    projectElement.classList.add("edit");

    // Extracting the project title, then removing title element
    let projectTitle;
    projectElement.childNodes.forEach(element => {
      if (element.classList.contains("project-title")) {
        projectTitle = element.textContent;
        element.remove();
      }
    });

    // Adding project title input element
    addProjectTitleInput({projectElement, value: projectTitle});

    // Adding edit buttons
    addProjectEditButtons(projectElement);
  });
}

function addProjectDeleteEvent(projectButtonElement) {
  projectButtonElement.addEventListener("click", (e) => {
    // Getting the correct project target element
    let projectElement = e.target;
    while (!projectElement.classList.contains("project")) {
      projectElement = projectElement.parentElement;
    }

    // Getting project ID
    const projectId = Number(projectElement.getAttribute("project-id"));
    
    // Removing project from data
    projectHandler.removeProject(projectId);

    // Removing project from DOM
    removeProject(projectId);

    // Re-loading project list
    loadProjects();
  });
}

function addProjectCancelEvent(projectButtonElement) {
  projectButtonElement.addEventListener("click", (e) => {
    // Re-loading project list
    loadProjects();
  });
}

function addProjectConfirmEvent(projectButtonElement) {
  projectButtonElement.addEventListener("click", (e) => {
    // Getting the correct project target element
    let projectElement = e.target;
    while (!projectElement.classList.contains("project")) {
      projectElement = projectElement.parentElement;
    }

    // Extracting the project title
    let projectTitle;
    projectElement.childNodes.forEach(element => {
      if (element.classList.contains("project-title-input")) {
        projectTitle = element.value;
      }
    });

    // Proceed only if new title is not empty
    if (projectTitle !== "") {
      // Rename only if target element has project id (so not a new element),
      // otherwise create new project
      if (projectElement.getAttribute("project-id")) {
        projectHandler.renameProjectById(Number(projectElement.getAttribute("project-id")), projectTitle);
      } else {
        const newProject = new Project(projectTitle);
        projectHandler.addProject(newProject);
        projectHandler.changeCurrentProject(newProject.id);
        addProject({project: newProject, toSelect: true});
      }
    }
    
    // Re-loading project list
    loadProjects();
  });
}

function removeProjectEvents({projectElementSkip = undefined}) {
  projectListElement.childNodes.forEach(projectElement => {
    if (projectElementSkip && !projectElementSkip.isEqualNode(projectElement)) {
      const projectElementClone = projectElement.cloneNode(true);
      projectElement.parentNode.replaceChild(projectElementClone, projectElement);
    }
  });
}

function createNewProject() {
  // Check if any other project is currently being edited; if so, exit
  for (const projectElement of projectListElement.childNodes) {
    if (projectElement.classList.contains("edit")) {
      return;
    }
  }

  // Unselect all other projects
  unselectProjects();

  // Create new project element in DOM
  const projectElement = document.createElement("li");
  projectElement.classList.add("project");
  projectElement.classList.add("selected");
  projectElement.classList.add("edit");
  addProjectTitleInput({projectElement});
  addProjectEditButtons(projectElement);
  projectListElement.appendChild(projectElement);
}

addProjectElement.addEventListener("click", createNewProject);
