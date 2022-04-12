let menu = document.querySelector(".nav_menu");
let menuPopup = document.querySelector(".navigation_popups");
let menuClose = document.querySelector(".close_btn");

menu.addEventListener("click", function () {
  menuPopup.style.transform = "translateX(100vw)";
  menuPopup.style.display = "block";
});
