import React, { Component, PropTypes } from 'react';

export default class AddSubreddit extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const subreeddit = this.refs.addsub.value;
    this.props.addSubreddit(subreeddit);
    this.refs.addsubForm.reset();
  }

  render () {
    return (
      <form className="add-subreddit" ref="addsubForm"  onSubmit={this.handleSubmit}>
        <input ref="addsub" type="text" placeholder="Add Subreddit"/>
      </form>
    )
  }
}


