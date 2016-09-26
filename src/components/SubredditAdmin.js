import React, { Component, PropTypes } from 'react';
import {findSubredditObject, findChecked, findUnchecked} from '../utils';

export default class SubredditAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const keep = findSubredditObject(findUnchecked(this.refs), this.props.selectedSubreddits);
    const remove = findSubredditObject(findChecked(this.refs), this.props.selectedSubreddits);
    this.props.replaceSubreddits(keep, remove);
  }

  render () {
    const {selectedSubreddits} = this.props;
    if (!selectedSubreddits.length) {
      return (<div></div>);
    }
    return (
      <div className="subreddit-admin">
        <form onSubmit={this.handleSubmit}>
          {selectedSubreddits.map(post => {
              return (
                <fieldset key={post.subreddit}>
                  <input ref={post.subreddit} type="checkbox"/>{post.subreddit}
                  </fieldset>
              )
            }
          )}
        </form>
        <button onClick={this.handleSubmit}>Remove Saved Subreddits</button>
      </div>
    )
  }
}


