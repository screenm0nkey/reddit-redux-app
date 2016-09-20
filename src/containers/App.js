import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import  Picker from '../components/Picker';
import  Posts from '../components/Posts';
import  Loading from '../components/Loading';
import  AddSubreddit from '../components/AddSubreddit';
import  LastUpdated from '../components/LastUpdated';
import  SubredditAdmin from '../components/SubredditAdmin';
import  OtherSubreddits from '../components/OtherSubreddits';
import * as c from '../constants';
import * as s from '../styles';
import styles from '../styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRedditRead = this.handleRedditRead.bind(this);
  }

  componentDidMount() {
    this.props.fetchSubReddits();
  }

  componentWillReceiveProps(nextProps) {
    const inCache = nextProps.redditCache[nextProps.selectedReddit];
    if (!inCache || this.props.selectedReddit !== nextProps.selectedReddit) {
      this.props.fetchSubReddit(nextProps.selectedReddit);
    }
  }

  handleChange(val) {
    this.props.subRedditSelected(val);
  }

  handleRefresh(evt) {
    evt.preventDefault();
    this.props.fetchSubReddit(this.props.selectedReddit, c.REFRESH);
  }

  handleRedditRead(id) {
    this.props.subRedditRead(id, this.props.selectedReddit);
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.redditCache[nextProps.selectedReddit]
  }


  render() {
    const {loading, subReddits, subRedditsOther, redditCache, selectedReddit, read} = this.props;
    const {addSubreddit, replaceSubreddits, addSubreddits} = this.props;
    const subReddit = redditCache[selectedReddit] || {data:[], date : new Date()};

    const posts = subReddit ? subReddit.data : [];
    const date = subReddit ? subReddit.date : '';
    const showRefresh = !!(posts.length > 0 && selectedReddit && selectedReddit !== 'default');
    const title = selectedReddit !== c.DEFAULT ? `R/${selectedReddit}` : '';

    return (
      <div className="the-app">
        <header>
          <div className="heading">
            <h1>
              Morgan Stanley
              <span style={s.selectedReddit}>{title}</span>
              <Loading
                loading={loading}
                selectedReddit={selectedReddit}>
              </Loading>
              <img src={subReddit.img} alt={subReddit.title}/>
            </h1>
          </div>

          <div className="clearfix">
            <AddSubreddit addSubreddit={addSubreddit}></AddSubreddit>

            <Picker
              items={subReddits}
              selectedReddit={selectedReddit}
              onChange={this.handleChange}>
            </Picker>
          </div>



          <p className="desc">{subReddit.description}</p>

          <LastUpdated
            items={subReddits}
            date={date}
            showRefresh={showRefresh}
            handleRefresh={this.handleRefresh}>
          </LastUpdated>
        </header>

        <div className="main">
          <Posts
            posts={posts}
            read={read}
            onClick={this.handleRedditRead}></Posts>
        </div>


        <footer>
          <SubredditAdmin
            subReddits={subReddits}
            replaceSubreddits={replaceSubreddits}>
          </SubredditAdmin>

          <OtherSubreddits
            addSubreddits={addSubreddits}
            subRedditsOther={subRedditsOther}>
          </OtherSubreddits>
        </footer>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {cache, selectedReddit, subReddits, loading, subRedditsOther} = state;
  return {
    redditCache: cache.redditCache,
    read: cache.redditsRead[selectedReddit] || {},
    selectedReddit,
    subReddits, // this is used for dropdown menu
    subRedditsOther, // additional subreddits
    loading
  };
}
// notice the action are also passed in as an object as that's how they are imported i.e.
// {fetchSubReddit : fetchSubReddits ...}
console.log(101, actions);
export default connect(mapStateToProps, actions)(App)


