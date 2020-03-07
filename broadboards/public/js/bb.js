function toggleDarkMode() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  var image = document.getElementById("logo");

  if (currentClass == "dark-mode") {
    body.className = "light-mode";
  } else {
    body.className = "dark-mode";
  }
}
