const leftColumn = document.getElementById("left-column");
const sideBarButton = document.getElementById("sidebar_button");
const searchInput = document.getElementsByClassName("w-25");
const filterWord = document.getElementsByClassName("text-uppercase");
let isSideBarHidden = false;

window.onresize = function () {
  let browserScreen = document.body.offsetWidth;
  if (browserScreen <= 1024) {
    leftColumn.style.display = "none";
    isSideBarHidden = true;
  } else {
    leftColumn.style.display = "block";
    leftColumn.style.position = "relative";
    isSideBarHidden = false;
  }
};

sideBarButton.addEventListener("click", function () {
  let browserScreen = document.body.offsetWidth;
  if (browserScreen >= 1024) {
    if (isSideBarHidden) {
      leftColumn.style.display = "none";
      isSideBarHidden = false;
    } else {
      leftColumn.style.display = "block";
      isSideBarHidden = true;
    }
  } else if (browserScreen < 1024) {
    if (isSideBarHidden) {
      leftColumn.style.display = "none";
      isSideBarHidden = false;
    } else {
      leftColumn.style.display = "block";
      leftColumn.style.position = "absolute";
      leftColumn.style.zIndex = "9999";
      leftColumn.style.height = "calc(100vh - 60px)";
      isSideBarHidden = true;
    }
  }
});

// Adilhan start :)
document.querySelector(".sorts").addEventListener(
  "click",
  function () {
    alert("This function is not ready yet");
  },
  false
);

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {
  if (key.keyCode == "13") {
    document.getElementById("audio").play();
  }
}

document.querySelector(".not_ready").addEventListener(
  "click",
  function () {
    alert("This function is not ready yet");
  },
  false
);

// Adilhan end :)
