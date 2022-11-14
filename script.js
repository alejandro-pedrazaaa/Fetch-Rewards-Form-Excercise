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
  console.log(data.states);

  createAndDisplayOptions(data.occupations);
  createAndDisplayStates(data.states);
};

const selectContainer = document.querySelector("#ocupations-container");
const createAndDisplayOptions = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;
    selectContainer.appendChild(option);
  });
};

const estateContainer = document.querySelector("#states-container");
const createAndDisplayStates = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation.name;
    option.textContent = occupation.name;
    estateContainer.appendChild(option);
  });
};

getDataFromAPI();
