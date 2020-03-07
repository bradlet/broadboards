import React from "react";
import { render } from "react-dom";
import App from "./App";
import NewThread from "./js/thread.js";

render(<NewThread />, document.getElementById("post"));
render(<App />, document.getElementById("root"));
