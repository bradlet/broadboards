function toggleDarkMode() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  var button = document.getElementById("dark-button");

  if (currentClass == "dark-mode") {
    button.src = "fa fa-toggle-on";
    body.className = "light-mode";
  } else {
    button.src = "fa fa-toggle-off";
    body.className = "dark-mode";
  }
}
