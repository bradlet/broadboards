/*
  FILENAME: App.js
  PURPOSE:
    JavaScript file that uses React to serve the feed portion
    of broadboards. This includes:
      1) Load initial threads
      2) Load threads upon scrolling down
      3) Organize where data is spread across a thread box
*/

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

// API routes
const getThreadsAPI = '/getThreads'
const getRollingThreadsAPI = '/getRollingThreads'
const threadCountAPI = '/getThreadCount'

// control starting # of threads
const startingNumOfThreads = 10;

// main class that controls threads and how they are loaded
class App extends React.Component {

  // fetches the first X threads from the API
  // once the page is loaded
  fetchThreads = async () => {
    const response = await fetch(getThreadsAPI+
      '/'+startingNumOfThreads);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // fetches how many threads there are in total in our database
  // the fetched value is important for the
  // loading upon scrolling mechanism
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

  // fetches threads after scrolling down, while taking
  // into consideration not to repeat already seen threads
  // by the client
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

  // extracts usernames portion of the returned object from the API
  filterUsernames = (obj) => {
    return obj.map(entry => entry['username'])
  };

  // extracts titles portion of the returned object from the API
  filterTitles = (obj) => {
    // return obj.map(entry => entry['title'].replace(/\s+$/, ''))
    return obj.map(entry => entry['title'])
  };

  // extracts timestamps portion of the returned object from the API
  filterTimestamps = (obj) => {
    // return obj.map(entry => entry['created'].replace(/\s+$/, ''))
    return obj.map(entry => entry['created'])
  };

  // extracts threads portion of the returned object from the API
  filterThreads = (obj) => {
    // return obj.map(entry => entry['content'].replace(/\s+$/, ''))
    return obj.map(entry => entry['content'])
  };

  // once the component mounts (i.e renders on the screen)
  // fetch how many threads in the database
  // then fetch the actual threads
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

  // initial state starts at empty arrays/0
  state = {
    usernames: [],
    titles: [],
    timestamps: [],
    threads: [],
    threadCount: 0,
    currentDisplayedThreads: 0
    // items: Array.from({ length: 10 })
  };

  // fetches more threads upon scrolling, has a timeout such that
  // the function won't be called twice if the user scrolls rapidly
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

  // responsible for determining if there are more threads in
  // the database to display
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
              <h4 className='infoText'>Username: {this.state.usernames[index]}
              {<br/>} {<br/>}
                  Title: {this.state.titles[index]}
                  {'  '} Created: {this.state.timestamps[index]}</h4>
              <p className='postText'>{this.state.threads[index]}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
