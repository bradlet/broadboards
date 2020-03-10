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

  filterUsernames = (obj) => {
    return obj.map(entry => entry['username'])
  };

  filterTitles = (obj) => {
    return obj.map(entry => entry['title'].replace(/\s+$/, ''))
  };

  filterTimestamps = (obj) => {
    return obj.map(entry => entry['created'].replace(/\s+$/, ''))
  };

  filterThreads = (obj) => {
    return obj.map(entry => entry['content'].replace(/\s+$/, ''))
  };

  componentDidMount() {
    this.fetchThreadCount()
      .then(res => this.setState({threadCount: res}))
      .catch(err => console.log(err));
    // Call our fetch function below once the component mounts
    this.fetchThreads()
      .then(res => {
        this.setState({
          usernames: this.filterUsernames(res),
          titles: this.filterTitles(res),
          timestamps: this.filterTimestamps(res),
          threads: this.filterThreads(res),
          currentDisplayedThreads: res.length,
          remainingThreads: this.state.threadCount - res.length
        })
    })
      .catch(err => console.log(err));
  }

  state = {
    usernames: [],
    titles: [],
    timestamps: [],
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
          // console.log(res)
          this.setState({
            currentDisplayedThreads:
            this.state.currentDisplayedThreads + res.length,
            remainingThreads: this.state.remainingThreads - res.length,
            usernames: this.state.usernames.concat(this.filterUsernames(res)),
            titles: this.state.titles.concat(this.filterTitles(res)),
            timestamps: this.state.timestamps.concat(this.filterTimestamps(res)),
            threads: this.state.threads.concat(this.filterThreads(res))
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
              <p>Username: {this.state.usernames[index]}</p>
              <p>Title: {this.state.titles[index]}
                {'  '} Created: {this.state.timestamps[index]}</p>
              <p>{this.state.threads[index]}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
