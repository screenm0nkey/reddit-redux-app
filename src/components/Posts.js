import React, { Component, PropTypes } from 'react';
import Post from './Post';

export default class Posts extends Component {
  render () {
    const {posts, read, onClick} = this.props;
    let postsXML;

    if (posts.length) {
      postsXML = <ul className="listy">
        {posts.map(post => {
            const hasRead = !!read[post.id];
            return (<Post key={post.id} read={hasRead} post={post} onClick={onClick}></Post>)
          }
        )}
      </ul>
    } else {
      postsXML = <p>No Posts available</p>;
    }

    return (postsXML)
  }
}