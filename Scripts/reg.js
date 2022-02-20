const form = document.querySelector("form");
let username = form.elements.namedItem("username");
let email = form.elements.namedItem("email");
let password = form.elements.namedItem("password");
let repeatPass = form.elements.namedItem("repeatPassword");

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
  "focus blur",
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
    uPassConfirmation.value == uPassword.value &&
    uPassword.value.length >= 6 &&
    uPassConfirmation.value.length >= 6
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

// checks parent elem for existens of error msg and deletes it
function deleteError(elem) {
  let errorCheck = elem.parentElement.querySelector("p");
  if (errorCheck != null) {
    elem.parentNode.removeChild(errorCheck);
  }
}

// Registration validation
function validate() {
  let u_name, u_email, u_password, u_repeatPass;
  u_name = 0;
  u_email = 0;
  u_password = 0;
  u_repeatPass = 0;

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
  } else if (!checkEmail(email)) {
    deleteError(email);
    email.parentElement.appendChild(generateError("*Invalid email"));
    email.style.borderColor = "red";
  }

  if (checkPassword(password)) {
    password.style.borderColor = "green";
    u_password = 1;
    if (checkPassConfirmation(repeatPass, password)) {
      password.style.borderColor = "green";
      repeatPass.style.borderColor = "green";
      u_repeatPass = 1;
    } else if (password.value.trim() != repeatPass.value.trim()) {
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
  if (
    !uppercaseCharacter.test(password.value.trim()) &&
    password.value.trim().length > 0
  ) {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password must contain at least one Uppercase character!")
    );
  }
  if (
    !numbers.test(password.value.trim()) &&
    password.value.trim().length > 0
  ) {
    deleteError(password);
    password.parentElement.appendChild(
      generateError("*Password must contain at least one number!")
    );
  }
  if (
    !specialCharacter.test(password.value.trim()) &&
    password.value.trim().length > 0
  ) {
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
// form.addEventListener("submit", validate);
// $(document).ready(function () {
//     get all child elements of form
//     const formChildren = $("form").children();
//      console.log(formChildren);
//   to add a validation alert block to child element of form
//     let addValidationAlert = $("<div>").addClass("validation_alert_block");
//     $("input").on("focusin focusout propertychange", function () {
//       if ($("input").val() === "") {
//         $(this).css("border-color", "red");
//       } else {
//         $(this).css("border-color", "green");
//         $("div").remove(".validation_alert_block");
//       }
//     });
//     $('input[name="username"]').on("focusout input", function () {
//       if ($(this).val() !== "") {
//         $(this).css("border-color", "green");
//       }
//       $("div").remove(".validation_alert_block");
//     });
//   validation alert block
//   let validationAlertBlock = $(".validation_alert_block");
//     $(".validation_alert_block").css({
//       border: "1px solid red",
//       borderRadius: "var(--input_border_radius)",
//       padding: "4px",
//     });
// });
