import React from "react";

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

    this.setState(revert => ({
      NewThreadVisible: !revert.NewThreadVisible
    }));
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
          <form action="new_thread" method="post">
            <div>
              <input type="text" name="title" required></input>
              <label for="title">Title</label>
            </div>
            <div>
              <textarea type="text" name="message" required></textarea>
              <label for="message">Comments</label>
            </div>
            <div>
              <button onClick={this.handleClick} type="submit">
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
