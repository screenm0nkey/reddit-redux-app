import React, {Component, PropTypes} from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.style = this.style.bind(this);
    this.state = {isHovering: false};
  }

  style() {
    if (this.state.isHovering) {
      return {display: "block"}
    } else {
      return {display: "none"}
    }
  }

  onMouseOver() {
    this.setState({isHovering: true});
  }

  onMouseOut() {
    this.setState({isHovering: false});
  }

  render() {
    const {post, read, onClick} = this.props;
    const classy = read ? 'read' : '';
    const hasThumb = post.thumbnail && post.thumbnail.startsWith('http');
    const isGif = post.thumbnail.indexOf('gif') >= 0 || post.url.indexOf('gfycat') >=0;

    return (
      <li className="post"
          key={post.id}
          onClick={()=>onClick(post.id)}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}>
        <a href={post.url}
           target="_blank"
           className={classy}>
          {hasThumb && <img className="tiny-imagey" src={post.thumbnail}/>}
          {read && (<strong>[READ] </strong>)}
          {isGif && <strong>[GIF] </strong>}
          {post.title}
          <span className="date">{post.date}</span>
          <span className="meta">
            [score = {post.score}]
          </span>
          {post.url===post.permalink &&
            <span className="meta">[comments = {post.comments}]</span>
          }
        </a>
        {post.url!==post.permalink &&
          <a className="comments-link" href={post.permalink} target="_blank">[comments = {post.comments}]</a>
        }
        {hasThumb && <img className="imagey" style={this.style()} src={post.thumbnail}/>}
      </li>
    )
  }
}