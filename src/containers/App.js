require('../styles.scss');
import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Loading from '../components/Loading';

class App extends Component {
  componentDidMount() {
    this.props.fetchSubReddits();
  }

  componentWillReceiveProps(nextProps) {
    const inCache = nextProps.redditCache[nextProps.selectedReddit];
    if (!inCache || this.props.selectedReddit !== nextProps.selectedReddit) {
      this.props.fetchSubReddit(nextProps.selectedReddit);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.redditCache[nextProps.selectedReddit];
  }

  render() {
    const {loading, selectedReddit, location} = this.props;
    const cn = ['the-app', location.pathname.slice(1)].join(' ');
    return (
      <div>
        <div className="app-header">
          <h2 className="heading">My Reddit APP</h2>
          <nav>
            <Link to="/" className="btn btn-primary">Posts</Link>
            <Link to="/admin" className="btn btn-primary">Admin</Link>
          </nav>
          <Loading
            loading={loading}
            selectedReddit={selectedReddit}>
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
  const {cache, selectedReddit, loading} = state;
  return {
    redditCache: cache.redditCache,
    selectedReddit,
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubReddit : fetchSubReddits ...}
export default connect(mapStateToProps, actions)(App)