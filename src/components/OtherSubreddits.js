import React, { Component, PropTypes } from 'react';
import {findSubredditObject, findChecked} from '../utils';

export default class OtherSubreddits extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const keep = findSubredditObject(findChecked(this.refs), this.props.subredditsList);
    this.props.addSubreddits(keep);
  }

  render () {
    const {subredditsList} = this.props;
    return (
      <div className="subreddit-admin other">
        <form onSubmit={this.handleSubmit}>
          {subredditsList.map(post => {
              return (
                <fieldset key={post.id}>
                  <input ref={post.subreddit} type="checkbox"/>
                  {post.subreddit}&nbsp;
                  <span className="subscribers">[{Number(post.subscribers).toLocaleString()}]</span>
                </fieldset>
              )
            }
          )}
        </form>
        <button onClick={this.handleSubmit}>Add Subreddits</button>
      </div>
    )
  }
}


