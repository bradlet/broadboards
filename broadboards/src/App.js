import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

// API routes
const getThreadsAPI = '/getThreads'
const getRollingThreadsAPI = '/getRollingThreads'
const threadCountAPI = '/getThreadCount'

// control starting # of threads
const startingNumOfThreads = 10;

class App extends React.Component {
  // this will need to be changed for the threads
  fetchThreads = async () => {
    const response = await fetch(getThreadsAPI+
      '/'+startingNumOfThreads);
    // console.log(response)
    const body = await response.json();
    // console.log(body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  fetchThreadCount = async() => {
    const response = await fetch(threadCountAPI);
    // console.log(response)
    const body = await response.json();
    // console.log(body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  fetchRollingThreads = async () => {
    const response = await fetch(getRollingThreadsAPI+
      '/'+startingNumOfThreads+'/'+this.state.threadCount+'/'+
      (this.state.currentDisplayedThreads));
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
      .then(res => {
        this.setState({
          threads: res,
          currentDisplayedThreads: res.length,
          remainingThreads: this.state.threadCount - res.length
        })
    })
      .catch(err => console.log(err));
  }

  state = {
    threads: [],
    threadCount: 0,
    currentDisplayedThreads: 0
    // items: Array.from({ length: 10 })
  };

  fetchMoreThreads = () => {
    // console.log('in fetchMore')
    setTimeout(() => {
      this.fetchRollingThreads()
        .then(res => {
          console.log(res)
          this.setState({
            currentDisplayedThreads:
            this.state.currentDisplayedThreads + res.length,
            remainingThreads: this.state.remainingThreads - res.length,
            threads: this.state.threads.concat(res)
          })
      // this.setState({
      //   threads: this.state.threads.concat(res)
      });
    }, 1500);
  };

  hasMore = () => {
    console.log('in hasMore')
    if (this.state.remainingThreads > 0) return true;
    else return false
  };

  render() {
    return (
      <div>
        This is where forum posts populate
        <hr />
        <InfiniteScroll
          dataLength={() => {
            this.componentDidMount()
              .then(res => this.state.threads.length)}
          }
          next={this.fetchMoreThreads}
          hasMore={this.hasMore()}
          loader={<h4>Loading...</h4>}
        >
          {this.state.threads.map((i, index) => (
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
