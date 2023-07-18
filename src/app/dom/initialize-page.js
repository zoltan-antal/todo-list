const navbarButtonElement = document.querySelector(".header .navbar-button");
const sidebarElement = document.querySelector(".sidebar");

export default function initializePage() {
  navbarButtonElement.addEventListener("click", toggleSidebar);
}

function toggleSidebar() {
  sidebarElement.classList.toggle("hidden");
}