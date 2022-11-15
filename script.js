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
 * @description - Async function that fetches the data from the API
 *
 * @returns - The data from the API
 */
const getDataFromAPI = async () => {
  const res = await fetch("https://frontend-take-home.fetchrewards.com/form");
  const data = await res.json();

  createAndDisplayOccupations(data.occupations);
  createAndDisplayStates(data.states);
};
getDataFromAPI();

/**
 * @description - Function that gets the "occupations" from the API and populates the #occupation
 * select element with the data
 *
 * @param {Array} occupations - The occupations from the API
 * @returns - The #occupation select element populated with the "occupations" from the API
 */
const occupationContainer = document.querySelector("#occupation");
const createAndDisplayOccupations = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;

    occupationContainer.appendChild(option);
  });
};

/**
 * @description - Function that gets the "states" array from the API and populates the #state
 * select element with the data
 *
 * @param {Array} states - The states array from the API
 * @returns - The #state select element populated with the "states" from the API
 */
const stateContainer = document.querySelector("#state");
const createAndDisplayStates = (states) => {
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.textContent = state.name;

    stateContainer.appendChild(option);
  });
};

/**
 * @description - Event listener for the submit button
 */
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getUserInput();
});

/**
 * @description - Function that is called when the submit button is clicked. It gets the user input,
 * saves it in an object, and if the input is valid, it sends the data to the API
 */
const getUserInput = () => {
  const requiredInputs = document.querySelectorAll(".required-input");

  const data = {};
  for (let i = 0; i < requiredInputs.length; i++) {
    data[requiredInputs[i].id] = requiredInputs[i].value;
  }

  if (checkIfDataIsValid(requiredInputs)) {
    sendDataToAPI(data);
  }
};

/**
 * @description - Function that checks if the user input is valid
 *
 * @param {Array} input - The user input
 * @returns {Boolean} - True if the input is valid, false otherwise
 */
const checkIfDataIsValid = (input) => {
  let isValid = true;
  const errorMessages = document.querySelectorAll(".error-message");

  for (let i = 0; i < input.length; i++) {
    let inputId = input[i].id;
    switch (inputId) {
      case "name":
        if (input[i].value.length < 5) {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent = "Please, enter a valid name";
          isValid = false;
        } else {
          input[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "email":
        if (!validateEmail(input[i].value)) {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent = "Please, enter a valid email address";
          isValid = false;
        } else {
          input[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "password":
        if (input[i].value.length < 8) {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent =
            "Your password must be at least 8 characters long";
          isValid = false;
        } else if (!validatePassword(input[i].value)) {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent =
            "Your password must have eight characters with one number, one special character, and a combination of uppercase and lowercase letters";
          isValid = false;
        } else {
          input[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "occupation":
        if (input[i].value === "") {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent = "Please, enter a valid occupation";
          isValid = false;
        } else if (input[i].value !== "") {
          input[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "state":
        if (input[i].value === "") {
          input[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent = "Please, enter a valid state";
          isValid = false;
        } else if (input[i].value !== "") {
          input[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      default:
        break;
    }
  }
  displaySuccessOrError(isValid, input);
  return isValid;
};

/**
 * @description - Helper function to validate the email
 *
 * @param {String} email - The email to validate
 * @returns {Boolean} - True if the email is valid, false otherwise
 */
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * @description - Helper function to validate the password
 *
 * @param {String} password - The password to validate
 * @returns {Boolean} - True if the password is valid, false otherwise
 */
const validatePassword = (password) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(String(password));
};

/**
 * @description - Function that displays a success or error popup window depending on the validity of
 * all the inputs
 *
 * @param {Boolean} isValid - True if the input is valid, false otherwise
 * @param {Array} input - The user input
 * @returns {Boolean} - True if the input is valid, false otherwise
 */
const displaySuccessOrError = (valid, input) => {
  const modal = document.querySelector(".modal-body");
  if (!valid) {
    modal.innerText = "Please, make sure all of the fields are valid.";
  } else {
    modal.innerText = "Your profile has been created!";
    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  }
};

/**
 * @description - Async function that sends the data to the API
 *
 * @param {Object} data - The user input
 * @returns - Console logs the response from the API
 */
const sendDataToAPI = async (data) => {
  const res = await fetch("https://frontend-take-home.fetchrewards.com/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  //To make sure the status code is the same as the one given in the instructions (201)
  if (res.status === 201) {
    console.log("All fieds have been provided and are valid");
  } else {
    console.log("Error");
  }
};
