/**
 * @description - When the user scrolls the page, the header resizes smoothly
 */
const headerContainer = document.querySelector(".header-container");
window.onscroll = () => {
  if (window.scrollY > 10) {
    headerContainer.classList.remove("py-3");
  } else {
    headerContainer.classList.add("py-3");
  }
};

/**
 * @description - Asynchronously fetches the data from the API
 *
 * @returns {Promise} - The data from the API
 */
const getDataFromAPI = async () => {
  const res = await fetch("https://frontend-take-home.fetchrewards.com/form");
  const data = await res.json();

  createAndDisplayOptions(data.occupations);
};

const selectContainer = document.querySelector(".form-select");
const createAndDisplayOptions = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;
    selectContainer.appendChild(option);
  });
};

getDataFromAPI();
