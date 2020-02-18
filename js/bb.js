function toggleDarkMode() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  var image = document.getElementById("logo");

  if (currentClass == "dark-mode") {
    image.src = "img/bb.png";
    body.className = "light-mode";
  } else {
    image.src = "img/bb-dark.png";
    body.className = "dark-mode";
  }
}
