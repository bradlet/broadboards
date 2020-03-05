import React from "react";
import { render } from "react-dom";
import App from "./App";

render(<NewThread />, document.getElementById("post"));
render(<App />, document.getElementById("root"));
