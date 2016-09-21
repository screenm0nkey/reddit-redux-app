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
    this.props.fetchSubReddit(this.props.selectedReddit, c.REFRESH);
  }

  handleRedditRead(id) {
    this.props.subRedditRead(id, this.props.selectedReddit);
  }

  render() {
    const {subReddits, redditCache, selectedReddit, read, addSubreddit} = this.props;
    const subReddit = redditCache[selectedReddit] || {data:[], date : new Date()};
    const posts = subReddit ? subReddit.data : [];
    const date = subReddit ? subReddit.date : '';
    const showRefresh = !!(posts.length > 0 && selectedReddit && selectedReddit !== 'default');
    const title = selectedReddit !== c.DEFAULT ? `R/${selectedReddit}` : '';

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
              items={subReddits}
              selectedReddit={selectedReddit}
              onChange={this.handleChange}>
            </Picker>
          </div>

          <p className="desc">{subReddit.description}</p>

          <LastUpdated
            items={subReddits}
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
  const {cache, selectedReddit, subReddits, loading} = state;
  return {
    redditCache: cache.redditCache,
    read: cache.redditsRead[selectedReddit] || {},
    selectedReddit,
    subReddits, // this is used for dropdown menu
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubReddit : fetchSubReddits ...}
console.log(101, actions);
export default connect(mapStateToProps, actions)(PostsIndex)


