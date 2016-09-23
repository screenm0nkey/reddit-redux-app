import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import  SubredditAdmin from '../components/SubredditAdmin';
import  OtherSubreddits from '../components/OtherSubreddits';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {selectedSubreddits, popularSubreddits, replaceSubreddits, addSubreddits} = this.props;

    return (
      <div>
        <SubredditAdmin
          selectedSubreddits={selectedSubreddits}
          replaceSubreddits={replaceSubreddits}>
        </SubredditAdmin>

        <OtherSubreddits
          addSubreddits={addSubreddits}
          popularSubreddits={popularSubreddits}>
        </OtherSubreddits>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {selectedSubreddits, popularSubreddits} = state;
  return {
    selectedSubreddits, // this is used for dropdown menu
    popularSubreddits, // additional selectedSubreddits
  };
}
export default connect(mapStateToProps, actions)(App)


