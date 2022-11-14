/**
 * @description - When the user scrolls the page, the header resizes smoothly
 */
const headerContainer = document.querySelector(".header-container");
window.onscroll = () => {
  if (window.scrollY > 10) {
    headerContainer.classList.remove("py-md-3");
  } else {
    headerContainer.classList.add("py-md-3");
  }
};
