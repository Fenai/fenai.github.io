const form = document.querySelector("form");

const form_input_row_icon = document.querySelectorAll(".form_input_row-icon");

let username = form.elements.namedItem("username");

let email = form.elements.namedItem("email");

let password = form.elements.namedItem("password");

let repeatPass = form.elements.namedItem("repeatPassword");

let passVisibilityToggle = document.getElementById("passVisibility");

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

addMultipleEventListeners(
  "username email password repeatPassword",
  "focus blur keyup",
  validate
);

let accounts = [];
accounts = JSON.parse(localStorage.getItem("accounts"));

function checkUsername(uName) {
  return uName.value.trim().length > 0;
}

function checkEmail(uEmail) {
  let mailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (accounts != null) {
    for (let i = 0; i < accounts.length; i++) {
      if (
        accounts[i]["email"] == uEmail.value.trim() ||
        !mailFormat.test(uEmail.value.trim())
      ) {
        return false;
      }
    }
  }
  return true;
}

function checkPassword(uPassword) {
  let passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/;
  return (
    uPassword.value.trim().length >= 6 && passCheck.test(uPassword.value.trim())
  );
}

function checkPassConfirmation(uPassConfirmation, uPassword) {
  return (
    uPassConfirmation.value.trim() == uPassword.value.trim() &&
    uPassword.value.trim().length >= 6 &&
    uPassConfirmation.value.trim().length >= 6
  );
}

function generateError(errorText) {
  const errorMsg = document.createElement("p");
  errorMsg.style.fontSize = "12px";
  errorMsg.style.color = "red";
  errorMsg.style.margin = "2px 0";
  errorMsg.innerHTML = errorText;
  return errorMsg;
}

// checks parent elem for the existence of error msg and deletes it
function deleteError(elem) {
  let errorCheck = elem.parentElement.querySelector("p");
  if (errorCheck != null) {
    elem.parentNode.removeChild(errorCheck);
  }
}

// Registration validation
function validate() {
  let u_name = 0,
    u_email = 0,
    u_password = 0,
    u_repeatPass = 0;

  let password2 = password.value.trim();
  let repeatPass2 = repeatPass.value.trim();
  // let lowercaseCharacter = /[a-z]/g;
  let uppercaseCharacter = /[A-Z]/g;
  let numbers = /[0-9]/g;
  let specialCharacter = /[!@#$%^&*]/g;

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
  // let letters = /^[A-Za-z]+$/;
  if (checkUsername(username)) {
    username.style.borderColor = "green";
    u_name = 1;
  }

  if (checkEmail(email) && email.value.trim().length > 0) {
    email.style.borderColor = "green";
    u_email = 1;
  } else if (email.value.trim().length > 0) {
    deleteError(email);
    email.parentElement.appendChild(generateError("*Invalid email"));
    email.style.borderColor = "red";
  }

  if (checkPassword(password)) {
    u_password = 1;
    if (checkPassConfirmation(repeatPass, password)) {
      password.style.borderColor = "green";
      repeatPass.style.borderColor = "green";
      u_repeatPass = 1;
    } else if (password2 != repeatPass2) {
      deleteError(repeatPass);
      repeatPass.parentElement.appendChild(
        generateError("*Password does not match")
      );
      password.style.borderColor = "red";
      repeatPass.style.borderColor = "red";
    }
  } else {
    password.style.borderColor = "red";
    repeatPass.style.borderColor = "red";
  }
  if (!uppercaseCharacter.test(password2) && password2.length > 0) {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password must contain at least one Uppercase character!")
    );
  }
  if (!numbers.test(password2) && password2.length > 0) {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password must contain at least one number!")
    );
  }
  if (!specialCharacter.test(password2) && password2.length > 0) {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password must contain at least one special character")
    );
  }

  return (result = u_name + u_email + u_password + u_repeatPass);
}

function register() {
  let result = validate();
  if (result === 4) {
    let accountList = [];

    const objPerson = {
      name: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    accountList = accountList.concat(
      JSON.parse(localStorage.getItem("accounts") || "[]")
    );

    accountList.push(objPerson);

    localStorage.setItem("accounts", JSON.stringify(accountList));

    localStorage.setItem("currentUser", JSON.stringify(objPerson));
    return true;
  }
  return false;
}

passVisibilityToggle.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  repeatPass.setAttribute("type", type);

  if (passVisibilityToggle.classList.contains("fa-eye-slash")) {
    passVisibilityToggle.classList.remove("fa-eye-slash");
    passVisibilityToggle.classList.add("fa-eye");
  } else {
    passVisibilityToggle.classList.remove("fa-eye");
    passVisibilityToggle.classList.add("fa-eye-slash");
  }
});
