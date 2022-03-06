const form = document.querySelector("form");

let email = form.elements.namedItem("email");

let password = form.elements.namedItem("password");

let passVisibilityToggle = document.getElementById("passVisibility");
// get all data from localStorage
let accounts = [];
accounts = JSON.parse(localStorage.getItem("accounts"));

function addMultipleEventListener(element, events, handler) {
  events
    .split(" ")
    .forEach((event) => element.addEventListener(event, handler));
}

function addMultipleEventListeners(elements, events, handler) {
  elements
    .split(" ")
    .forEach((element) =>
      addMultipleEventListener(
        form.elements.namedItem(element),
        events,
        handler
      )
    );
}

addMultipleEventListeners("email password", "focus blur keyup", validate);

function checkEmailAndPassword(uEmail, uPassword) {
  if (accounts != null) {
    for (let i = 0; i < accounts.length; i++) {
      if (
        accounts[i]["email"] == uEmail &&
        accounts[i]["password"] == uPassword
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkEmail(uEmail) {
  let mailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return mailFormat.test(uEmail.value.trim());
}

function generateError(errorText) {
  const errorMsg = document.createElement("p");
  errorMsg.style.fontSize = "12px";
  errorMsg.style.color = "red";
  errorMsg.style.margin = "2px 0";
  errorMsg.innerHTML = errorText;
  return errorMsg;
}

// checks parent elem for existens of error msg and deletes it
function deleteError(elem) {
  let errorCheck = elem.parentElement.querySelector("p");
  if (errorCheck != null) {
    elem.parentNode.removeChild(errorCheck);
  }
}

function getUserName(u_email) {
  if (accounts != null) {
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i]["email"] == u_email) {
        return accounts[i]["name"];
      }
    }
  }
}

function validate() {
  let input = document.querySelectorAll("input");

  // checking each input element for filled
  for (let i = 0; i < input.length; i++) {
    if (input[i].value.trim().length <= 0) {
      deleteError(input[i]);
      input[i].parentElement.appendChild(
        generateError("*Please fill the field!")
      );
      input[i].value = "";
      input[i].style.borderColor = "red";
    } else {
      deleteError(input[i]);
    }
  }

  if (email.value.trim().length > 0 && !checkEmail(email)) {
    deleteError(email);
    email.parentElement.appendChild(generateError("*Invalid email!"));
    email.style.borderColor = "red";
  } else {
    email.style.borderColor = "#cfd0d7";
  }
  if (password.value.trim().length > 0) {
    password.style.borderColor = "#cfd0d7";
  }
}

function check() {
  // to store text which is inside input element
  let tempEmail = email.value.trim();
  let tempPassword = password.value.trim();

  if (checkEmailAndPassword(tempEmail, tempPassword)) {
    let userName = getUserName(tempEmail);
    let currentUser = {
      name: userName,
      email: email.value.trim(),
      password: password.value.trim(),
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return true;
  } else {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password or email is incorrect!")
    );
    email.style.borderColor = "red";
    password.style.borderColor = "red";
    return false;
  }
}

passVisibilityToggle.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (passVisibilityToggle.classList.contains("fa-eye-slash")) {
    passVisibilityToggle.classList.remove("fa-eye-slash");
    passVisibilityToggle.classList.add("fa-eye");
  } else {
    passVisibilityToggle.classList.remove("fa-eye");
    passVisibilityToggle.classList.add("fa-eye-slash");
  }
});
