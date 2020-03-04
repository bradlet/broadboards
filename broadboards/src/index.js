import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// Might add different style options later to make the
// threads wider in the display menu, as an additional
// option. For now, they are set to really only showcase
// thread titles, but not content.
const style = {
  height: 30,
  border: "1px solid grey",
  margin: 6,
  padding: 8,
  backgroundColor: "grey"
};

class App extends React.Component {
  // this will need to be changed for the threads
  fetchThreads = async () => {
    const response = await fetch('/express_backend');
    // console.log(response)
    const body = await response.json();
    // console.log(body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.fetchThreads()
      .then(res => this.setState({ items: res}))
      .catch(err => console.log(err));
  }

  state = {
    items: []
    // items: Array.from({ length: 10 })
  };

  // We will need to alter this to handle
  // db requests for threads to feed
  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

  render() {
    return (
      <div>
        This is where forum posts populate
        <hr />
        <InfiniteScroll
          dataLength={() => {
            this.componentDidMount()
              .then(res => this.state.items.length)}
          }
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={i}>
              #{i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));