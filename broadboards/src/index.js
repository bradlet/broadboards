import React from "react";
import { render } from "react-dom";
import NewThread from "./js/thread.js";
import LoginArea from "./js/loginArea.js";
import App from "./App";

render(<LoginArea />, document.getElementById("login-area"));
render(<NewThread />, document.getElementById("post"));
render(<App />, document.getElementById("root"));
