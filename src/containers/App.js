require('../styles.scss');
import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Loading from '../components/Loading';

class App extends Component {
  componentDidMount() {
    this.props.fetchSubredditsList();
  }

  componentWillReceiveProps(nextProps) {
    const inCache = nextProps.redditCache[nextProps.selectedSubreddit.subreddit];
    if (!inCache || this.props.selectedSubreddit.subreddit !== nextProps.selectedSubreddit.subreddit) {
      this.props.fetchSubreddit(nextProps.selectedSubreddit);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.redditCache[nextProps.selectedSubreddit.subreddit];
  }

  render() {
    const {loading, selectedSubreddit, location} = this.props;
    const cn = ['the-app', location.pathname.slice(1)].join(' ');
    return (
      <div>
        <div className="app-header">
          <h2 className="heading">Morgan Stanley</h2>
          <nav>
            <Link to="/" className="btn btn-primary">Posts</Link>
            <Link to="/admin" className="btn btn-primary">Admin</Link>
          </nav>
          <Loading
            loading={loading}
            selectedSubreddit={selectedSubreddit}>
          </Loading>
        </div>
        <div className={cn}>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {cache, selectedSubreddit, loading} = state;
  return {
    redditCache: cache.redditCache,
    selectedSubreddit,
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubreddit : fetchSubReddits ...}
export default connect(mapStateToProps, actions)(App)