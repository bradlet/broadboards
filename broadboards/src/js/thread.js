/*
  FILENAME: thread.js
  PURPOSE:
    JavaScript file that uses React to control the
    thread posting mechanism. This includes:
      1) Create a thread button that display input fields
      upon press
      2) Send a thread to the API endpoint
*/

import React from "react";
import "./../textbox.css";

// API routes
const postThreadAPI = "/postThread";

// main class that controls create a thread mechanism
class NewThread extends React.Component {
  constructor(props) {
    super(props);
    // default state: no new thread, no thread submission
    this.state = {
      NewThreadVisible: false,
      submitted: false
    };
    // this binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  // click handler that changes submission status upon press
  handleClick() {
    this.setState({
      submitted: true
    });

    this.setState({
      NewThreadVisible: !this.state.NewThreadVisible
    });
  }

  render() {
    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <button onClick={this.handleClick}>Create a post</button>
        {this.state.NewThreadVisible && (
          <form action={postThreadAPI} method="POST">
            <div>
              <input type="text" name="title" required />
              <label for="title">Title</label>
            </div>
            <div>
              <textarea
                id="textbox"
                type="text"
                color="purple"
                name="thread"
                required
              />
              <label for="thread">Thread</label>
            </div>
            <div>
              <button type="submit">Post it!</button>
            </div>
          </form>
        )}
        <br />
      </div>
    );
  }
}

export default NewThread;
