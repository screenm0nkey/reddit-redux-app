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
function subReddits(state = [], action) {
  switch (action.type) {
    case c.REPLACE_SUBREDDITS:
      return [
        ...action.value
      ].sort(sorter);
    case c.ADD_SUBREDDIT:
      return [
        ...state,
        action.value
      ].sort(sorter);
    case c.ADD_SUBREDDITS:
      return uniq([
        ...state,
        ...action.value
      ]).sort(sorter);
    default:
      return state;
  }
}


function subRedditsOther(state = [], action) {
  switch (action.type) {
    case c.SUBREDDITS_LOADED:
      const newSubReddits = without(action.value, ...action.savedSubReddits);
      return [
        ...state,
        ...newSubReddits
      ].sort(sorter);
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


function updateSubRedditInfo(state = {}, action) {
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
        date: action.reddit === 'default' ? '' : new Date().toGMTString()
      };
      return Object.assign({}, state, obj);
    case c.SUBREDDIT_INFO_LOADED:
      let subReddit = {
        [action.reddit] : updateSubRedditInfo(state[action.reddit], action)
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
      let group = redditsReadGroup(state[action.selectedReddit], action);
      return Object.assign({}, state, {[action.selectedReddit] : group});
    default:
      return state;
  }
}

// default to first item if user deletes active selected reddit
function checkSelectedRedditIsInList(state, action) {
  if (action.value.indexOf(state)<0) {
    return action.value[0];
  } else {
    return state;
  }
}


function selectedReddit(state = 'default', action) {
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
  subReddits,
  subRedditsOther,
  cache: combineReducers({
    redditCache,
    redditsRead
  }),
  selectedReddit,
  loading
})