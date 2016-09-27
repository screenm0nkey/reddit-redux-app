import {combineReducers} from 'redux'
import * as c from '../constants';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import map from 'lodash/map';


const sorter = (a, b) => {
  const an = a.subscribers;
  const bn = b.subscribers;
  const as = a.subreddit.toLowerCase();
  const bs = b.subreddit.toLowerCase();
  return an === bn ? (as === bs ? 0 : as > bs ? 1 : -1) : an < bn ? 1 : -1;
};


// these the items used in the dropdown menu
function selectedSubreddits(state = [], action) {
  switch (action.type) {
    case c.REPLACE_SUBREDDITS:// removing subreddit
      return [
        ...action.keep
      ].sort(sorter);
    case c.ADD_SUBREDDIT:
      return uniq([
        ...state,
        action.value
      ]).sort(sorter);
    case c.REMOVE_SUBREDDIT:
      return state.filter((item)=>action.payload !== item);
    case c.ADD_SUBREDDITS:
      return uniq([
        ...state,
        ...action.value
      ]).sort(sorter);
    // update the selectedSubreddits info when
    // fetchSubredditInfo() is called
    case c.SUBREDDIT_INFO_LOADED:
      let arr = state.filter(reddit => reddit.subreddit !== action.value.subreddit);
      arr.push(Object.assign({}, action.value));
      return arr;
    default:
      return state;
  }
}


function selectedSubreddit(state = c.DEFAULT, action) {
  switch (action.type) {
    case c.REPLACE_SUBREDDITS:
      return checkSelectedRedditIsInList(state, action);
    case c.SUBREDDIT_SELECTED:
      return action.value;
    case c.ADD_SUBREDDIT:
      return action.value;
    case c.SUBREDDIT_INFO_LOADED:
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}


// this is a list of popular selectedSubreddits which are not in the subreddit list (above)
// they are displayed in the OtherSubreddits component
function subredditsList(state = [], action) {
  switch (action.type) {
    case c.REPLACE_SUBREDDITS:
      return uniq([
        ...state,
        ...action.remove
      ]).sort(sorter);
    case c.SUBREDDITS_LOADED:
      const saved = map(action.savedSubReddits, 'subreddit');
      const newSubReddits = action.value.filter(item => saved.indexOf(item.subreddit)<0);
      return uniq([
        ...state,
        ...newSubReddits
      ]).sort(sorter);
    case c.ADD_SUBREDDITS:
      return without(state, ...action.value).sort(sorter);
    default:
      return state;
  }
}


function loading(state = false, action) {
  switch (action.type) {
    case c.REQUEST_STARTED:
    case c.REQUEST_FINISHED:
      return action.value;
    default:
      return state;
  }
}


function updateSubredditInfo(state = {}, action) {
  switch (action.type) {
    case c.SUBREDDIT_INFO_LOADED:
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}


function redditCache(state = {}, action) {
  let obj = {};
  switch (action.type) {
    case c.PREPARE_CACHE:
      return Object.assign({}, state, {
        [action.reddit.subreddit] : {
          data : []
        }
      });
    case c.SUBREDDIT_LOADED:
      obj[action.reddit.subreddit] = {
        data: action.value || [],
        date: action.reddit.subreddit === c.DEFAULT.subreddit ? '' : new Date().toGMTString()
      };
      return Object.assign({}, state, obj);
    case c.SUBREDDIT_INFO_LOADED:
      let subReddit = {
        [action.reddit.subreddit] : updateSubredditInfo(state[action.reddit.subreddit], action)
      };
      return Object.assign({}, state, subReddit);
    default:
      return state;
  }
}


function redditsReadGroup(state = {}, action) {
  return Object.assign({}, state, {[action.value] : true})
}


function redditsRead(state = {}, action) {
  switch (action.type) {
    case c.SUBREDDIT_READ:
      let group = redditsReadGroup(state[action.selectedSubreddit.subreddit], action);
      return Object.assign({}, state, {[action.selectedSubreddit.subreddit] : group});
    default:
      return state;
  }
}

// default to first item if user deletes active selected reddit
function checkSelectedRedditIsInList(state, action) {
  if (action.keep.indexOf(state)<0) {
    return action.keep[0] || c.DEFAULT;
  } else {
    return state;
  }
}




export default combineReducers({
  selectedSubreddits,
  selectedSubreddit,
  subredditsList,
  loading,
  cache: combineReducers({
    redditCache,
    redditsRead
  })
})