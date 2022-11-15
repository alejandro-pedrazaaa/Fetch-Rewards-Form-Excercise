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

const getDataFromAPI = async () => {
  const res = await fetch("https://frontend-take-home.fetchrewards.com/form");
  const data = await res.json();

  createAndDisplayOptions(data.occupations);
  createAndDisplayStates(data.states);
};

const selectContainer = document.querySelector("#occupation");
const createAndDisplayOptions = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;

    selectContainer.appendChild(option);
  });
};

const stateContainer = document.querySelector("#state");
const createAndDisplayStates = (states) => {
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.textContent = state.name;

    stateContainer.appendChild(option);
  });
};

const getUserInput = async () => {
  const requiredInputs = document.querySelectorAll(".required-input");

  const data = {};
  for (let i = 0; i < requiredInputs.length; i++) {
    data[requiredInputs[i].id] = requiredInputs[i].value;
  }

  if (checkIfDataIsValid(requiredInputs)) {
    sendDataToAPI(data);
  }
};

const sendDataToAPI = async (data) => {
  const res = await fetch("https://frontend-take-home.fetchrewards.com/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);
  return res;
};

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
 */
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(String(password));
};

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getUserInput();
});

getDataFromAPI();

const displaySuccessOrError = (valid, input) => {
  const modal = document.querySelector(".modal-body");
  if (!valid) {
    modal.innerText = "Please, make sure all of the fields are valid.";
  } else {
    modal.innerText = "Your form has been submitted successfully!";
    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  }
};
