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

const selectContainer = document.querySelector("#ocupations-container");
const createAndDisplayOptions = (occupations) => {
  occupations.forEach((occupation) => {
    const option = document.createElement("option");
    option.value = occupation;
    option.textContent = occupation;

    selectContainer.appendChild(option);
  });
};

const stateContainer = document.querySelector("#states-container");
const createAndDisplayStates = (states) => {
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.textContent = state.name;

    stateContainer.appendChild(option);
  });
};

const getUserInput = () => {
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

  if (checkIfDataIsValid(data)) {
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

  displaySuccessOrError(res);
};

const checkIfDataIsValid = (data) => {
  const inputIds = Object.keys(data);
  const inputValues = Object.values(data);

  for (let i = 0; i < inputIds.length; i++) {
    if (inputValues[i] === "" || inputValues[i] === "default") {
      //get their index
      const index = inputIds.indexOf(inputIds[i]);
      inputIds[i].classList.add("error-border");
      console.log(index);
    }
  }

  console.log(inputIds);
};

const displaySuccessOrError = (res) => {
  const modal = document.querySelector(".modal-body");
  if (res.status === 201) {
    modal.innerText = "Success! Your profile has been created.";
  } else {
    modal.innerText = "Failure! It seems like there was an error.";
  }
};

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getUserInput();
});

getDataFromAPI();
