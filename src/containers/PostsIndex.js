import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import  Picker from '../components/Picker';
import  Posts from '../components/Posts';
import  AddSubreddit from '../components/AddSubreddit';
import  LastUpdated from '../components/LastUpdated';
import * as c from '../constants';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRedditRead = this.handleRedditRead.bind(this);
  }

  handleChange(val) {
    this.props.subRedditSelected(val);
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
    const subReddit = redditCache[selectedSubreddit] || {data:[], date : new Date()};
    const posts = subReddit ? subReddit.data : [];
    const date = subReddit ? subReddit.date : '';
    const showRefresh = !!(posts.length > 0 && selectedSubreddit && selectedSubreddit !== 'default');
    const title = selectedSubreddit !== c.DEFAULT ? `R/${selectedSubreddit}` : '';

    return (
      <div>
        <img className="group-image" src={subReddit.img} alt={subReddit.title}/>
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

          <p className="desc">{subReddit.description}</p>

          <LastUpdated
            items={selectedSubreddits}
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
    read: cache.redditsRead[selectedSubreddit] || {},
    selectedSubreddit,
    selectedSubreddits, // this is used for dropdown menu
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubreddit : fetchSubReddits ...}
console.log(101, actions);
export default connect(mapStateToProps, actions)(PostsIndex)


