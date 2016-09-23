import React, { Component, PropTypes } from 'react';

export default class OtherSubreddits extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const keep = Object.keys(this.refs).filter(key => this.refs[key].checked);
    this.props.addSubreddits(keep);
  }

  render () {
    const {popularSubreddits} = this.props;
    return (
      <div className="subreddit-admin other">
        <form onSubmit={this.handleSubmit}>
          {popularSubreddits.map(post => {
              return (<fieldset key={post}><input ref={post} type="checkbox"/>{post}</fieldset>)
            }
          )}
        </form>
        <button onClick={this.handleSubmit}>Add Subreddits</button>
      </div>
    )
  }
}


