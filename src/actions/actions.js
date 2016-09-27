import * as c from '../constants';

export function requestStarted(val) {
  return {
    type: c.REQUEST_STARTED,
    value: val
  }
}

export function requestFinished() {
  return {
    type: c.REQUEST_FINISHED,
    value: false
  }
}

export function popularSubredditsLoaded(subreddits, savedSubreddits) {
  return {
    type: c.SUBREDDITS_LOADED,
    value: subreddits,
    savedSubreddits
  }
}

export function replaceSubreddits(keep, remove) {
  return {
    type: c.REPLACE_SUBREDDITS,
    keep,
    remove
  }
}

export function removeSubreddit(subreddit) {
  return {
    type: c.REMOVE_SUBREDDIT,
    payload : subreddit
  }
}

export function subRedditRead(id, selectedSubreddit) {
  return {
    type: c.SUBREDDIT_READ,
    value: id,
    selectedSubreddit
  }
}


export function addSubreddit(subreddit) {
  return {
    type: c.ADD_SUBREDDIT,
    value: {
      subreddit,
      subscribers : 0,
      id : (Math.random() * 100000) + 1,
    }
  }
}

export function addSubreddits(selectedSubreddits) {
  return {
    type: c.ADD_SUBREDDITS,
    value: selectedSubreddits
  }
}

export function prepareSubRedditCache(reddit) {
  return {
    type: c.PREPARE_CACHE,
    reddit: reddit
  }
}

export function subredditLoaded(reddit, data) {
  return {
    type: c.SUBREDDIT_LOADED,
    value: data,
    reddit: reddit
  }
}

export function subRedditInfoLoaded(reddit, data) {
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


