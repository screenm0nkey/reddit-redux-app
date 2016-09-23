import {combineReducers} from 'redux'
import * as c from '../constants';
import uniq from 'lodash/uniq';
import without from 'lodash/without';


const sorter = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  switch (true) {
    case a < b:
      return -1;
    case a > b:
      return 1;
    default:
      return 0;
  }
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
      const newSubReddits = without(action.value, ...action.savedSubReddits);
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
        [action.reddit] : {
          data : []
        }
      });
    case c.SUBREDDIT_LOADED:
      obj[action.reddit] = {
        data: action.value,
        date: action.reddit === c.DEFAULT ? '' : new Date().toGMTString()
      };
      return Object.assign({}, state, obj);
    case c.SUBREDDIT_INFO_LOADED:
      let subReddit = {
        [action.reddit] : updateSubredditInfo(state[action.reddit], action)
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
      let group = redditsReadGroup(state[action.selectedSubreddit], action);
      return Object.assign({}, state, {[action.selectedSubreddit] : group});
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


function selectedSubreddit(state = c.DEFAULT, action) {
  switch (action.type) {
    case c.REPLACE_SUBREDDITS:
      return checkSelectedRedditIsInList(state, action);
    case c.SUBREDDIT_SELECTED:
      return action.value;
    case c.ADD_SUBREDDIT:
      return action.value;
    default:
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