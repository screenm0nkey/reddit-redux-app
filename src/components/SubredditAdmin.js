import React, { Component, PropTypes } from 'react';


export default class SubredditAdmin extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const keep = Object.keys(this.refs).filter(key => !this.refs[key].checked);
    const remove = Object.keys(this.refs).filter(key => this.refs[key].checked);
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
              return (<fieldset key={post}><input ref={post} type="checkbox"/>{post}</fieldset>)
            }
          )}
        </form>
        <button onClick={this.handleSubmit}>Remove Saved Subreddits</button>
      </div>
    )
  }
}


