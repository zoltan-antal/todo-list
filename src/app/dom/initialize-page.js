import demo from "./demo";

const navbarButtonElement = document.querySelector(".header .navbar-button");
const sidebarElement = document.querySelector(".sidebar");
const demoButtonElement = document.querySelector(".header .demo");

export default function initializePage() {
  navbarButtonElement.addEventListener("click", toggleSidebar);
  demoButtonElement.addEventListener("click", demo);
}

function toggleSidebar() {
  sidebarElement.classList.toggle("hidden");
}
