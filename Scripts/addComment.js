function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
}

let account = [];
account = JSON.parse(localStorage.getItem("currentUser") || "[]");

let usertext = document.querySelector("#usertext");
let button = document.querySelector("#buttn");
let listDiv = $("#blockss");
button.addEventListener("click", function () {
    let tempCommentArr = JSON.parse(localStorage.getItem("comment") || "[]");
    //   console.log(account["name"]);
    let new_comm = usertext.value.trim();

    const tempCommentObj = {
        userName: account["name"],
        comment: new_comm,
    };

    tempCommentArr.push(tempCommentObj);

    localStorage.setItem("comment", JSON.stringify(tempCommentArr));

    listDiv.append(` <div id="comm">
      <h4>${account["name"] ? account["name"] : "Anonymous"}</h4>
      <p>${new_comm}</p>
      <hr>
    </div> `);
    document.getElementById("usertext").value = "";
});

let commentsArray = [];
commentsArray = JSON.parse(localStorage.getItem("comment"));

if (commentsArray != null) {
    for (let i = 0; i < commentsArray.length; i++) {
        listDiv.append(` <div id="comm">
        <h4>${
            commentsArray[i]["userName"]
                ? commentsArray[i]["userName"]
                : "Anonymous"
        }</h4>
        <p>${commentsArray[i]["comment"]}</p>
        <hr>
        </div> `);
    }
}

var field = document.querySelector("textarea");
var backUp = field.getAttribute("placeholder");

field.onfocus = function () {
    this.setAttribute("placeholder", "");
};

field.onblur = function () {
    this.setAttribute("placeholder", backUp);
};

function eraseText() {
    document.getElementById("usertext").value = "";
}
