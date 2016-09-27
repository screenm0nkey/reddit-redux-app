import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import  Picker from '../components/Picker';
import  Posts from '../components/Posts';
import  AddSubreddit from '../components/AddSubreddit';
import  LastUpdated from '../components/LastUpdated';
import {findSubredditObject} from '../utils';
import * as c from '../constants';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRedditRead = this.handleRedditRead.bind(this);
  }

  handleChange(val) {
    var subreddit = findSubredditObject([val], this.props.selectedSubreddits)[0];
    this.props.subRedditSelected(subreddit);
  }

  handleRefresh(evt) {
    evt.preventDefault();
    this.props.fetchSubreddit(this.props.selectedSubreddit, c.REFRESH);
  }

  handleRedditRead(id) {
    this.props.subRedditRead(id, this.props.selectedSubreddit);
  }

  render() {
    const {selectedSubreddits, redditCache, selectedSubreddit, read, addSubreddit} = this.props;
    const subreddit = redditCache[selectedSubreddit.subreddit] || {data:[], date : new Date()};
    const posts = subreddit ? subreddit.data : [];
    const date = subreddit ? subreddit.date : '';
    const showRefresh = !!(posts.length > 0 && selectedSubreddit && selectedSubreddit !== 'default');
    const title = selectedSubreddit.subreddit !== c.DEFAULT.subreddit ? `R/${selectedSubreddit.subreddit} [${Number(selectedSubreddit.subscribers).toLocaleString()}]` : '';

    return (
      <div>
        <img className="group-image" src={subreddit.img} alt={subreddit.title}/>

        <header>
          <div className="heading">
            <h2>
              <span>{title}</span>
            </h2>
          </div>
          <div className="reddit-selector">
            <AddSubreddit addSubreddit={addSubreddit}></AddSubreddit>
            <Picker
              items={selectedSubreddits}
              selectedSubreddit={selectedSubreddit}
              onChange={this.handleChange}>
            </Picker>
          </div>
          <p className="desc">{selectedSubreddit.description}</p>
          <LastUpdated
            date={date}
            showRefresh={showRefresh}
            handleRefresh={this.handleRefresh}>
          </LastUpdated>
        </header>

        <div className="main">
          <Posts
            posts={posts}
            read={read}
            onClick={this.handleRedditRead}></Posts>
        </div>

      </div>
    )
  }
}


function mapStateToProps(state) {
  const {cache, selectedSubreddit, selectedSubreddits, loading} = state;
  return {
    redditCache: cache.redditCache,
    read: cache.redditsRead[selectedSubreddit.subreddit] || {},
    selectedSubreddit,
    selectedSubreddits, // this is used for dropdown menu
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubreddit : fetchSubReddits ...}
console.log(101, actions);
export default connect(mapStateToProps, actions)(PostsIndex)


