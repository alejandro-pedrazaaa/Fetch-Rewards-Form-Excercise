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
    createAndDisplayOptionsInDropdownMenus(data);
  } catch (err) {
    console.error(err);
  }
};
getDataFromAPI();

/**
 * @description - Function that takes the data from the API and creates the options for the
 * dropdown menus
 *
 * @param {Object} objectFromAPI - The data from the API
 * @returns - The options for the dropdown menus
 */
const createAndDisplayOptionsInDropdownMenus = (objectFromAPI) => {
  const allDropdownMenus = document.querySelectorAll("select");
  const objectKeys = Object.keys(objectFromAPI);

  for (let i = 0; i < allDropdownMenus.length; i++) {
    if (allDropdownMenus[i].classList.contains(objectKeys[i])) {
      for (let j = 0; j < objectFromAPI[objectKeys[i]].length; j++) {
        const optionTag = document.createElement("option");

        if (typeof objectFromAPI[objectKeys[i]][j] === "string") {
          optionTag.value = objectFromAPI[objectKeys[i]][j];
          optionTag.textContent = objectFromAPI[objectKeys[i]][j];
        } else {
          optionTag.value = objectFromAPI[objectKeys[i]][j].name;
          optionTag.textContent = objectFromAPI[objectKeys[i]][j].name;
        }
        allDropdownMenus[i].appendChild(optionTag);
      }
    }
  }
};

/**
 * @description - Global variables
 *
 * @property {Object} requiredInputs - The inputs in the form
 * @property {Object} formLabels - The labels that are above each input
 * @property {Object} requiredAccents - The accents that are next to each label
 * @property {Object} submitButton - The "Join" button
 */
const requiredInputs = document.querySelectorAll(".required-input");
const formLabels = document.querySelectorAll(".form-label");
const requiredAccents = document.querySelectorAll(".required-accent");
const submitBtn = document.querySelector(".submit-btn");

/**
 * @description - Function that adds "onblur" event listener to each input field and checks
 * the user's input to see if it is valid
 *
 * @returns - Checks the user's input
 */
requiredInputs.forEach((input, index) => {
  input.addEventListener("blur", () => {
    checkInputs(index);
  });
});

/**
 * @description - Function that adds "onclick" event listener to the "Join" button and checks
 * the user's input to see if it is valid
 *
 * @returns - Checks the user's input
 */
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  submitBtn.classList.add("error-border");
  requiredInputs.forEach((input, index) => {
    checkInputs(index);
  });
  displayOnSubmitErrorMessages();
});

const displayOnSubmitErrorMessages = () => {
  const errorOnsubmitDiv = document.querySelector(".error-onsubmit-div");
  const errorOnsubmitText = document.querySelector(".error-onsubmit-text");

  // console.log(input.value);
  // console.log(formLabels[index]);

  //if any of the labels contains the "error-message" class, display the error message
  for (let i = 0; i < formLabels.length; i++) {
    if (
      formLabels[i].classList.contains("error-message") ||
      requiredInputs[i].value === ""
    ) {
      errorOnsubmitDiv.hidden = false;
      break;
    } else {
      errorOnsubmitDiv.hidden = true;
    }
  }
};

/**
 * @description - Function that checks the user's input one by one. If the user's input is
 * invalid, the function adds the "error-message" class to the label and changes the
 * innerText of the "accent" span element
 *
 * @param {Number} index - The index, or indexes, of the input field
 * @returns - True or false depending on the user's inpu
 */
const checkInputs = (index) => {
  let inputValue = requiredInputs[index].value.trim();
  let label = formLabels[index];
  let accent = requiredAccents[index];
  let inputId = requiredInputs[index].id;

  switch (requiredInputs[index].id) {
    case "name":
      checkFullName(inputValue, label, accent);
      break;
    case "email":
      checkEmail(inputValue, label, accent);
      break;
    case "password":
      checkPassword(inputValue, label, accent);
      break;
    case "occupation":
    case "state":
      checkOccupationAndState(inputId, inputValue, label, accent);
      break;
    default:
      break;
  }
};

/**
 * @description - Helper function that checks the full name
 *
 * @param {String} userInput - The user's input
 * @param {Object} label - The label element
 * @param {Object} accent - The span element
 * @returns - True or false depending on the user's input
 */
const checkFullName = (userInput, label, accent) => {
  if (userInput.length < 5) {
    label.classList.add("error-message");
    accent.innerText = " - Please enter your full name";
  } else {
    label.classList.remove("error-message");
    accent.innerText = "*";
  }
};

/**
 * @description - Helper function that checks the email
 *
 * @param {String} userInput - The user's input
 * @param {Object} label - The label element
 * @param {Object} accent - The span element
 * @returns - True or false depending on the user's input
 */
const checkEmail = (userInput, label, accent) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailIsValid = re.test(String(userInput).toLowerCase());

  if (!emailIsValid) {
    label.classList.add("error-message");
    accent.innerText = " - Please enter a valid email address";
  } else {
    label.classList.remove("error-message");
    accent.innerText = "*";
  }
};

/**
 * @description - Helper function that checks the password
 *
 * @param {String} userInput - The user's input
 * @param {Object} label - The label element
 * @param {Object} accent - The span element
 * @returns - True or false depending on the user's input
 */
const checkPassword = (userInput, label, accent) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const passwordIsValid = re.test(String(userInput));

  if (userInput.length < 8) {
    label.classList.add("error-message");
    accent.innerText = " - Password must be at least 8 characters";
  } else if (!passwordIsValid) {
    label.classList.add("error-message");
    accent.innerText =
      " - Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  } else {
    label.classList.remove("error-message");
    accent.innerText = "*";
  }
};

/**
 * @description - Helper function that checks the occupation and state
 *
 * @param {String} userInput - The user's input
 * @param {Object} label - The label element
 * @param {Object} accent - The span element
 * @returns - True or false depending on whether the user has selected an option
 */
const checkOccupationAndState = (inputId, userInput, label, accent) => {
  if (userInput === "") {
    label.classList.add("error-message");
    if (inputId === "occupation") {
      accent.innerText = " - Please select your occupation";
    } else {
      accent.innerText = " - Please select your state";
    }
  } else {
    label.classList.remove("error-message");
    accent.innerText = "*";
  }
};

// const isReadyToSubmit = (submitError, errorMessage) => {
//   const userData = {};
//   for (let i = 0; i < requiredInputs.length; i++) {
//     userData[requiredInputs[i].id] = requiredInputs[i].value;
//   }
//   sendDataToAPI(userData);
// };

const sendDataToAPI = async (userData) => {
  try {
    const res = await fetch(
      "https://frontend-take-home.fetchrewards.com/form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};
