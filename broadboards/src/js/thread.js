import React from "react";

// API routes
const postThreadAPI = '/postThread'

class NewThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewThreadVisible: false,
      submitted: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

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
              <input type="text" name="user" required/>
              <label for="user">User</label>
            </div>
            <div>
              <input type="text" name="title" required/>
              <label for="title">Title</label>
            </div>
            <div>
              <textarea type="text" name="thread" required/>
              <label for="thread">Thread</label>
            </div>
            <div>
              <button type="submit">
                Post it!
              </button>
            </div>
          </form>
        )}
        <br />
      </div>
    );
  }
}

export default NewThread;
