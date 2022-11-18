/**
 * @description - When the user scrolls the page, the header resizes smoothly
 */
window.onscroll = () => {
  const navContainer = document.querySelector(".navigation-container");
  if (window.scrollY > 10) {
    navContainer.classList.remove("py-3");
  } else {
    navContainer.classList.add("py-3");
  }
};

/**
 * @description - Async function that fetches the data from the API
 *
 * @returns - The data from the API
 */
const getDataFromAPI = async () => {
  try {
    const res = await fetch("https://frontend-take-home.fetchrewards.com/form");
    const data = await res.json();

    createAndDisplayOptionsInDropdownMenus(data, Object.keys(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * @description - Function that populates the dropdown menus with the data from the API
 *
 * @param {Object} objectFromAPI - The data from the API. It is an object.
 * @param {Array} objectKeys - The keys of the objectFromAPI object
 * @returns - The data from the API as option in the dropdowns menus
 */
const createAndDisplayOptionsInDropdownMenus = (objectFromAPI, objectKeys) => {
  const allDropdownMenus = document.querySelectorAll("select");

  for (let i = 0; i < allDropdownMenus.length; i++) {
    if (allDropdownMenus[i].classList.contains(objectKeys[i])) {
      for (let j = 0; j < objectFromAPI[objectKeys[i]].length; j++) {
        const optionTag = document.createElement("option");

        let valueOfOptionTag = "";
        let textOfOptionTag = "";
        if (typeof objectFromAPI[objectKeys[i]][j] === "string") {
          valueOfOptionTag = objectFromAPI[objectKeys[i]][j];
          textOfOptionTag = objectFromAPI[objectKeys[i]][j];
        } else {
          valueOfOptionTag = objectFromAPI[objectKeys[i]][j].name;
          textOfOptionTag = objectFromAPI[objectKeys[i]][j].name;
        }
        optionTag.value = valueOfOptionTag;
        optionTag.textContent = textOfOptionTag;
        allDropdownMenus[i].appendChild(optionTag);
      }
    }
  }
};
getDataFromAPI();

/**
 * @description - Event listener for the "Join!" button
 */
const joinButton = document.querySelector(".submit");
joinButton.addEventListener("click", (e) => {
  e.preventDefault();
  getAndSendUserInput();
});

/**
 * @description - Function that is called when the "Join!" button is clicked. The function
 * gets the user input, saves it in an object and, if the input is valid, it sends the
 * data to the API
 */
const getAndSendUserInput = () => {
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
 * @param {Array} userInput - The user input
 * @returns {Boolean} - True if the input is valid, false otherwise
 */
const checkIfDataIsValid = (requiredInputs) => {
  const errorMessages = document.querySelectorAll(".error-message");
  let isValid = true;

  for (let i = 0; i < requiredInputs.length; i++) {
    let inputId = requiredInputs[i].id;

    switch (inputId) {
      case "name":
        if (requiredInputs[i].value.length < 5) {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          isValid = false;
        } else {
          requiredInputs[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "email":
        if (!validateEmail(requiredInputs[i].value)) {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          isValid = false;
        } else {
          requiredInputs[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "password":
        if (requiredInputs[i].value.length < 8) {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          isValid = false;
        } else if (!validatePassword(requiredInputs[i].value)) {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          errorMessages[i].textContent =
            "Your password must have at least eight characters, one number, one special character, and at least one uppercase letter";
          isValid = false;
        } else {
          requiredInputs[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "occupation":
        if (requiredInputs[i].value === "") {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          isValid = false;
        } else if (requiredInputs[i].value !== "") {
          requiredInputs[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      case "state":
        if (requiredInputs[i].value === "") {
          requiredInputs[i].classList.add("error-border");
          errorMessages[i].hidden = false;
          isValid = false;
        } else if (requiredInputs[i].value !== "") {
          requiredInputs[i].classList.remove("error-border");
          errorMessages[i].hidden = true;
        }
        break;
      default:
        break;
    }
  }
  displayPopupScreen(isValid, requiredInputs);
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
 * @description - Function that displays a success or error popup window depending on the
 * validity of all the inputs
 *
 * @param {Boolean} valid - True if the input is valid, false otherwise
 * @param {Array} inputs - The inputs to clear if the information is valid
 * @returns {Boolean} - True if the inputs were valid, false otherwise
 */
const displayPopupScreen = (valid, inputs) => {
  const popupScreen = document.querySelector(".modal-body");

  if (!valid) {
    popupScreen.innerText = "Please, make sure all of the fields are valid.";
  } else {
    popupScreen.innerText = "Your profile has been created!";
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
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
  //See what was sent to the API
  console.log(await res.json());
  //To make sure the status code is the same as the one given in the instructions (201)
  console.log(data);
  if (res.status === 201) {
    console.log("Success");
  } else {
    console.log("Error");
  }
};
