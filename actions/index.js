import * as c from '../constants';

function requestStarted(val) {
  return {
    type: c.REQUEST_STARTED,
    value: val
  }
}

function requestFinished() {
  return {
    type: c.REQUEST_FINISHED,
    value: false
  }
}

// these the items used in the dropdown menu
function subRedditsLoaded(subReddits, savedSubReddits) {
  return {
    type: c.SUBREDDITS_LOADED,
    value: subReddits,
    savedSubReddits
  }
}

export function replaceSubreddits(keep, remove) {
  return {
    type: c.REPLACE_SUBREDDITS,
    keep,
    remove
  }
}

export function removeSubReddit(subreddit) {
  return {
    type: c.REMOVE_SUBREDDIT,
    payload : subreddit
  }
}

export function subRedditRead(id, selectedReddit) {
  return {
    type: c.SUBREDDIT_READ,
    value: id,
    selectedReddit
  }
}


export function addSubreddit(subReddit) {
  return {
    type: c.ADD_SUBREDDIT,
    value: subReddit
  }
}

export function addSubreddits(subReddits) {
  return {
    type: c.ADD_SUBREDDITS,
    value: subReddits
  }
}

function prepareSubRedditCache(reddit) {
  return {
    type: c.PREPARE_CACHE,
    reddit: reddit
  }
}

function subRedditLoaded(reddit, data) {
  return {
    type: c.SUBREDDIT_LOADED,
    value: data,
    reddit: reddit
  }
}

function subRedditInfoLoaded(reddit, data) {
  return {
    type: c.SUBREDDIT_INFO_LOADED,
    value: data,
    reddit: reddit
  }
}

export function subRedditSelected(reddit) {
  return {
    type: c.SUBREDDIT_SELECTED,
    value: reddit
  }
}

export function refreshReddit(reddit) {
  return {
    type: c.REFRESH_SUBREDDIT,
    value: reddit
  }
}

const DELAY = 0;

// driven by the App component's componentWillReceiveProps() method.
export function fetchSubReddit(reddit, refresh) {
  return (dispatch, getState) => {
    const state = getState();
    // don't fetch if default is selected
    if (reddit === 'default') {
      dispatch(subRedditLoaded(reddit, []));
      return;
    }
    // don't fetch if reddit is in cache
    const cachedData = state.cache.redditCache[reddit] || {};
    if (cachedData.data && cachedData.data.length && !refresh) {
      return;
    }
    // show the loading icon
    dispatch(requestStarted(`Getting posts for ${reddit}`));
    dispatch(prepareSubRedditCache(reddit));
    // fetch reddit data
    fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(res =>res.json())
      .then(subRedditData => {
        if (subRedditData.error) {
          dispatch(requestFinished());
          dispatch(removeSubReddit(reddit));
          window.alert(`${reddit} is ${subRedditData.message}`);
          return;
        }
        // could't get promise.all to work with fetch()
        // so doing nested call
        fetchSubRedditInfo(dispatch, reddit);
        subRedditData = formatRedditData(subRedditData);
        // added an intentional timeout so show loading icon
        setTimeout(()=> {
          dispatch(requestFinished());
          dispatch(subRedditLoaded(reddit, subRedditData));
        }, DELAY)
      });
  }
}


export function fetchSubRedditInfo(dispatch, reddit) {
  return fetch(`https://www.reddit.com/r/${reddit}/about.json`)
    .then(res =>res.json())
    .then(aboutData => {
      const data = {
        title: aboutData.data.header_title,
        img: aboutData.data.header_img,
        description: aboutData.data.public_description
      };
      dispatch(subRedditInfoLoaded(reddit, data));
    });
}


const formatRedditData = data => {
  return data.data.children.map(item => {
    const {data} = item;
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(data.created_utc);

    return {
      id: data.id,
      title: data.title,
      url: data.url,
      thumbnail: data.thumbnail,
      comments: data.num_comments,
      score: data.score,
      date : d.toGMTString().slice(0,16)
    }
  }).sort((a, b)=>b.score - a.score);
};

// this is subreddit list for the dropdown menus
/*
/subreddits/popular
/subreddits/new
/subreddits/gold
/subreddits/default
 */
export function fetchSubReddits() {
  return (dispatch, getState) => {
    dispatch(requestStarted('Getting list of 100 popular sub reddits'));
    fetch('https://www.reddit.com/subreddits/popular/.json?limit=100')
      .then(res =>res.json())
      .then(json => json.data.children.map(item=>item.data.url.replace('/r/', '').replace('/', '')))
      .then(data => {
        dispatch(requestFinished());
        dispatch(subRedditsLoaded(data, getState().subReddits));
      });
  }
}

