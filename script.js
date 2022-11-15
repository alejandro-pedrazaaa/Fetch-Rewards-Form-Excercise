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
  createAndDisplayStates(data.states);
};

/**
 * @description - Adds options to the ocupations select tag with the values
 * from the API
 *
 * @param {Array} occupations - The occupations from the API
 */
const selectContainer = document.querySelector("#ocupations-container");
const createAndDisplayOptions = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;

    selectContainer.appendChild(option);
  });
};

/**
 * @description - Adds options to the states select tag with the values
 * from the API
 *
 * @param {Array} occupations - The occupations from the API
 */
const stateContainer = document.querySelector("#states-container");
const createAndDisplayStates = (states) => {
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.textContent = state.name;

    stateContainer.appendChild(option);
  });
};

/**
 * @description - Asynchronously fetches the data from the API and sends it to
 * check if the data is valid
 *
 * @param {Object} data - The data from the form
 * @returns {Promise} - The response from the API
 */
const sendDataToAPI = async () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const occupation = selectContainer.value;
  const state = stateContainer.value;

  const data = {
    name: name,
    email: email,
    password: password,
    occupation: occupation,
    state: state,
  };

  const res = await fetch("https://frontend-take-home.fetchrewards.com/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  displaySuccessOrError(res);
};

/**
 * @description - Displays a success or error message depending on the response
 * from the API
 *
 * @param {Object} res - The response from the API
 * @returns {Promise} - Based on the response, it will display a success or error
 */
const displaySuccessOrError = (res) => {
  const modal = document.querySelector(".modal-body");
  if (res.status === 201) {
    modal.innerText = "Success! Your profile has been created.";
  } else {
    modal.innerText = "Failure! It seems like there was an error.";
  }
};

/**
 * @description - When the user clicks the submit button, the data is sent to the API
 * and the user is notified if the data was sent successfully or not
 *
 * @param {Event} e - The event object
 */
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendDataToAPI();
});

getDataFromAPI();
