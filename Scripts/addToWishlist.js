const addToWishlistButtons = $(".add-wishlist");
const cardLinks = $(".card_link");
const checkedIcon = '<i class="fa-solid fa-circle-check wishlisted"></i>';
const emptyBox = $("#empty-box");

let user_email,
  wishlist,
  cardHref,
  cardBgImageUrl,
  cardTitle,
  cardDevelopers,
  cardPlatform,
  cardHead;
let wishlistArr = [];
let currentUser = [];

const wishlist_ul = $("#wishlist-ul");

wishlistArr = wishlistArr.concat(
  JSON.parse(localStorage.getItem("wishlist") || "[]")
);

currentUser = currentUser.concat(
  JSON.parse(localStorage.getItem("currentUser") || "[]")
);

user_email = currentUser[0]["email"];

function isExist(link) {
  for (let i = 0; i < wishlistArr.length; i++) {
    if (
      wishlistArr[i]["itemHref"] == link &&
      wishlistArr[i]["user_email"] == user_email
    ) {
      return true;
    }
  }
  return false;
}

function remove(link, email) {
  let arr = [];
  for (let i = 0; i < wishlistArr.length; i++) {
    if (
      wishlistArr[i]["itemHref"] == link &&
      wishlistArr[i]["user_email"] == email
    ) {
      wishlistArr.splice(i, 1);
    }
  }
}

addToWishlistButtons.click(function () {
  wishlist = $(this).closest(".card");

  wishlistArr = JSON.parse(localStorage.getItem("wishlist") || "[]");
  // getting background-image url
  cardBgImageUrl = wishlist.find(".card_image").css("background-image");
  cardBgImageUrl = cardBgImageUrl.replace(/^url\(['"]?(.+?)['"]?\)/, "$1");

  // getting href of anchor tag
  cardHref = wishlist.find("a");
  cardHref = cardHref.attr("href");

  // getting card title
  cardTitle = wishlist.find(".card-title");
  cardTitle = cardTitle[0].textContent;

  // getting card Developers name
  cardDevelopers = wishlist.find(".text-muted");
  cardDevelopers = cardDevelopers[0].textContent;

  // getting card platform
  cardPlatform = wishlist.find(".card_platform");
  cardPlatform = cardPlatform[0].textContent;

  const objItem = {
    user_email: user_email,
    itemHref: cardHref,
    itemBgImageUrl: cardBgImageUrl,
    itemTitle: cardTitle,
    itemDevelopers: cardDevelopers,
    itemPlatform: cardPlatform,
  };

  if (wishlistArr.length > 0) {
    if (!isExist(cardHref)) {
      wishlistArr.push(objItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
      location.reload();
    }
  } else {
    wishlistArr.push(objItem);
    localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
    console.log("Wishlist added");
    location.reload();
  }
});

if (wishlistArr.length > 0) {
  for (let i = 0; i < wishlistArr.length; i++) {
    if (user_email === wishlistArr[i]["user_email"]) {
      if (emptyBox != null) {
        emptyBox.remove();
      }
      wishlist_ul.append(
        '<li class="wishlist-li"> ' +
          '<div class="wishlist-card"> ' +
          '<div class="wishlist-card_header"> ' +
          '<a href="' +
          wishlistArr[i]["itemHref"] +
          '"> ' +
          '<img class="wishlist-card_img" src="' +
          wishlistArr[i]["itemBgImageUrl"] +
          '" alt=""> ' +
          "</a> " +
          "</div> " +
          '<div class="wishlist-card_body"> ' +
          '<div class="wishlist-card_info"> ' +
          '<h4><a class="wishlist-card_title" href="' +
          wishlistArr[i]["itemHref"] +
          '">' +
          wishlistArr[i]["itemTitle"] +
          "</a></h4> " +
          '<h6 class="text-muted wishlist-card_developers">' +
          wishlistArr[i]["itemDevelopers"] +
          "</h6> " +
          '<div class="card_platform ml-1">' +
          wishlistArr[i]["itemPlatform"] +
          "</div> " +
          "</div> " +
          '<div class="delete-box"> ' +
          '<button class="delete">Remove</button> ' +
          "</div> " +
          "</div> " +
          "</div> " +
          "</li>"
      );
    }
  }
}

const removeFromWishlist = $(".delete");

removeFromWishlist.click(function () {
  let wishlistCard = $(this).closest(".wishlist-li");

  wishlistArr = JSON.parse(localStorage.getItem("wishlist") || "[]");

  let cardImg, cardTitle, cardHref, cardDevelopers, cardPlatform;

  cardImg = wishlistCard.find(".wishlist-card_img").attr("src");

  cardTitle = wishlistCard.find(".wishlist-card_title").text();

  cardHref = wishlistCard.find(".wishlist-card_title").attr("href");

  cardDevelopers = wishlistCard.find(".wishlist-card_developers").text();

  cardPlatform = wishlistCard.find(".card_platform").text();

  if (isExist(cardHref)) {
    remove(cardHref, user_email);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlistArr));

  location.reload();
});

for (let i = 0; i < cardLinks.length; i++) {
  for (let j = 0; j < wishlistArr.length; j++) {
    if (
      wishlistArr[j]["itemHref"] == cardLinks[i] &&
      wishlistArr[j]["user_email"] == user_email
    ) {
      cardHead = cardLinks[i].parentNode;
      cardHead.children[1].remove();
      cardHead.append($.parseHTML(checkedIcon)[0]);
    }
  }
}
