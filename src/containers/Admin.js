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
    const {subReddits, subRedditsOther, replaceSubreddits, addSubreddits} = this.props;

    return (
      <div>
        <SubredditAdmin
          subReddits={subReddits}
          replaceSubreddits={replaceSubreddits}>
        </SubredditAdmin>

        <OtherSubreddits
          addSubreddits={addSubreddits}
          subRedditsOther={subRedditsOther}>
        </OtherSubreddits>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {subReddits, subRedditsOther} = state;
  return {
    subReddits, // this is used for dropdown menu
    subRedditsOther, // additional subreddits
  };
}
export default connect(mapStateToProps, actions)(App)


