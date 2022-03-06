const navbar = document.querySelector("#navbar");
const navbarAuth = document.getElementById("navbar-auth");
const leftColumn = document.getElementById("left-column");
const sidebar = document.getElementById("sidebar");
const headerLogo = document.getElementById("header-logo");
const logo = document.getElementById("logo");
const offcanvasBody = document.getElementsByClassName("offcanvas-body");
const auth = document.getElementById("auth");

let browserScreen = document.body.offsetWidth;
if (browserScreen <= 1024) {
  if (leftColumn != null) {
    leftColumn.style.display = "none";
  }
  if (headerLogo != null && sidebar != null) {
    headerLogo.insertBefore(sidebar, headerLogo.firstChild);
  }
  if (browserScreen <= 500) {
    if (auth != null || currentAccount == null) {
      offcanvasBody[0].parentElement.insertBefore(auth, offcanvasBody[0]);
    }
    userProfile[0].remove();
    if (navbarAuth != null && currentAccount == null) {
      navbarAuth.remove();
    }
  } else {
    if (auth != null) auth.remove();
    if (currentAccount != null) {
      navbar.appendChild(userProfile[0]);
    }
    if (navbarAuth != null && currentAccount == null) {
      navbar.appendChild(navbarAuth);
    }
  }
} else {
  if (sidebar != null) {
    sidebar.remove();
  }
  if (currentAccount != null) {
    navbar.appendChild(userProfile[0]);
  }
  if (leftColumn != null) {
    leftColumn.style.display = "block";
    leftColumn.style.position = "relative";
  }
}

window.onresize = function () {
  let browserScreen = document.body.offsetWidth;
  if (browserScreen <= 1024) {
    if (leftColumn != null) {
      leftColumn.style.display = "none";
    }
    if (headerLogo != null && sidebar != null) {
      headerLogo.insertBefore(sidebar, headerLogo.firstChild);
    }
    if (browserScreen <= 500) {
      userProfile[0].remove();
      if (auth != null || currentAccount == null) {
        offcanvasBody[0].parentElement.insertBefore(auth, offcanvasBody[0]);
      }
      if (navbarAuth != null) {
        navbarAuth.remove();
      }
    } else {
      if (auth != null) auth.remove();
      if (currentAccount != null) {
        navbar.appendChild(userProfile[0]);
      }
      if (navbarAuth != null && currentAccount == null) {
        navbar.appendChild(navbarAuth);
      }
    }
  } else {
    if (sidebar != null) {
      sidebar.remove();
    }
    if (currentAccount != null) {
      navbar.appendChild(userProfile[0]);
    }
    if (leftColumn != null) {
      leftColumn.style.display = "block";
      leftColumn.style.position = "relative";
    }
  }
};

if (document.querySelector(".sorts")) {
  document.querySelector(".sorts").addEventListener(
    "click",
    function () {
      alert("This function is not ready yet");
    },
    false
  );
}

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {
  if (key.keyCode == "13") {
    document.getElementById("audio").play();
  }
}

if (document.querySelector(".not_ready")) {
  document.querySelector(".not_ready").addEventListener(
    "click",
    function () {
      alert("This function is not ready yet");
    },
    false
  );
}
