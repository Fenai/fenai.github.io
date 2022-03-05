const loginAndRegButtons = $("#navbar-auth");
const userProfile = $("#user_profile");
const offcanvasUserProfile = $("#offcanvas-user_profile");

// get all data from localStorage
let currentAccount = [];
currentAccount = JSON.parse(localStorage.getItem("currentUser"));

if (currentAccount != null) {
  user_name = currentAccount["name"];
  user_email = currentAccount["email"];

  loginAndRegButtons.remove();
  $("#auth").remove();
  $("#navbar").append(userProfile);
  $("#offcanvas-body").append(offcanvasUserProfile);
  $("#offcanvas-user_name").html(user_name);
  $("#user_name").html(user_name);
} else {
  userProfile.remove();
  offcanvasUserProfile.remove();
}

$(".logout").click(function () {
  localStorage.removeItem("currentUser");
  window.location.href = "login.htm";
});
