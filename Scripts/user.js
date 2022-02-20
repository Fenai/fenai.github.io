let navbar = $(".navbar").children();
let loginAndRegButtons = navbar[2];

// get all data from localStorage
let accounts = [];
accounts = JSON.parse(localStorage.getItem("currentUser"));

if (accounts != null) {
  user_name = accounts["name"];
  user_email = accounts["email"];

  loginAndRegButtons.remove();

  // user icon
  let userIcon = $('<i class="fas fa-user"></i>');
  $("<div></div>")
    .prop("id", "user_block")
    .append(userIcon)
    .appendTo($(".navbar"));

  userIcon.css({
    "border-radius": "4px",
    background: "black",
    padding: "5px",
    color: "rgb(255, 194, 82)",
  });
  // user block
  let userBlock = $("#user_block");
  userBlock.css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "margin-left": "10px",
  });

  // user dropdown list
  let dropDown = $('<div id="user-dropdown_list"></div>');

  // user name paragraph
  $('<p id="user_name"></p>').html(user_name).appendTo(userBlock);
  $("#user_name").css({
    margin: 0,
    "margin-left": "10px",
  });

  // logout user button
  let logoutBtn = $('<button id="logout">Logout</button>');
  logoutBtn.css({
    "margin-left": "10px",
    padding: "5px 12px",
    "background-color": "#ffc252",
    border: "none",
    "border-radius": "3px",
    "font-family": "'Be Vietnam Pro', sans-serif",
    "font-size": "13px",
    "font-weight": "600",
    cursor: "pointer",
  });
  logoutBtn.appendTo(userBlock);
}

$("#logout").click(function () {
  localStorage.removeItem("currentUser");
  window.location.href = "login.htm";
});
