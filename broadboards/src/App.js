import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

class App extends React.Component {
  // this will need to be changed for the threads
  fetchThreads = async () => {
    const response = await fetch('/getThreads');
    // console.log(response)
    const body = await response.json();
    // console.log(body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  fetchThreadCount = async() => {
    const response = await fetch('/getThreadCount');
    // console.log(response)
    const body = await response.json();
    // console.log(body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  componentDidMount() {
    this.fetchThreadCount()
      .then(res => this.setState({threadCount: res}))
      .catch(err => console.log(err));
    // Call our fetch function below once the component mounts
    this.fetchThreads()
      .then(res => this.setState({ items: res}))
      .catch(err => console.log(err));
  }

  state = {
    items: []
    threadCount: 0
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
            <div className="post" key={i}>
              #{i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
