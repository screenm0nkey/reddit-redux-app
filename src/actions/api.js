import * as act from './actions';
import axios from 'axios'
import {uniqBy} from 'lodash';

const DELAY = 0;


// called in App.componentDidMount()
export function fetchSubredditsList() {
  const limit = 100;

  function getChildren(res) {
    return res.data.data.children
  }

  function getPopular() {
    return axios.get(`https://www.reddit.com/subreddits/popular/.json?limit=${limit}`);
  }

  function getDefault() {
    return axios.get(`https://www.reddit.com/subreddits/.json?limit=${limit}`);
  }

  function getNew() {
    return axios.get(`https://www.reddit.com/subreddits/new/.json?limit=${limit}`);
  }

  return (dispatch, getState) => {
    dispatch(act.requestStarted('Getting list of 100 popular sub reddits'));
    axios.all([getPopular(), getDefault(), getNew()])
      .then(res => {
        const pop = getChildren(res[0]);
        const def = getChildren(res[1]);
        const gld = getChildren(res[2]);
        return pop.concat(def, gld);
      })
      .then(data => {
        return data.map(item=> {
          const subreddit = item.data.url.replace('/r/', '').replace('/', '');
          return {
            id: item.data.id,
            subreddit,
            subscribers: item.data.subscribers
          }
        });
      })
      .then(data => {
        // remove duplicates
        data = _.uniqBy(data, function (e) {
          return e.subreddit;
        })
          .filter((item)=>item.subscribers > 1);
        dispatch(act.requestFinished());
        dispatch(act.popularSubredditsLoaded(data, getState().selectedSubreddits));
      });
  }
}


// driven by the App component's componentWillReceiveProps() method.
export function fetchSubreddit(reddit, refresh) {
  return (dispatch, getState) => {
    const state = getState();
    // don't fetch if default is selected
    if (reddit.subreddit === 'default') {
      dispatch(act.subredditLoaded(reddit, []));
      return;
    }
    // don't fetch if reddit is in cache
    const cachedData = state.cache.redditCache[reddit.subreddit] || {};
    if (cachedData.data && cachedData.data.length && !refresh) {
      return;
    }
    // show the loading icon
    dispatch(act.requestStarted(`Getting posts for ${reddit.subreddit}`));
    dispatch(act.prepareSubRedditCache(reddit));
    // fetch reddit data
    fetch(`https://www.reddit.com/r/${reddit.subreddit}.json`)
      .then(res =>res.json())
      .then(subredditData => {
        if (subredditData.error) {
          dispatch(act.requestFinished());
          dispatch(act.removeSubreddit(reddit));
          window.alert(`${reddit.subreddit} is ${subredditData.message}`);
          return;
        }
        // could't get promise.all to work with fetch() so doing nested call
        fetchSubredditInfo(dispatch, reddit);
        subredditData = formatRedditData(subredditData);
        // added an intentional timeout so show loading icon
        setTimeout(()=> {
          dispatch(act.requestFinished());
          dispatch(act.subredditLoaded(reddit, subredditData));
        }, DELAY)
      });
  }
}


const fetchSubredditInfo = (dispatch, reddit) => {
  return fetch(`https://www.reddit.com/r/${reddit.subreddit}/about.json`)
    .then(res =>res.json())
    .then(aboutData => {
      const {id, header_title, header_img, public_description, subscribers} = aboutData.data;
      const data = {
        id,
        subscribers,
        subreddit: reddit.subreddit,
        title: header_title,
        img: header_img,
        description: public_description
      };
      dispatch(act.subRedditInfoLoaded(reddit, data));
    });
};


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
      date: d.toGMTString().slice(0, 16),
      permalink: 'https://www.reddit.com' + data.permalink
    }
  }).sort((a, b)=>b.score - a.score);
};


