

export function findSubredditObject (strArr, objArr) {
  return objArr.filter(item=>strArr.indexOf(item.subreddit)>=0);
}

export function findChecked(refs) {
  return Object.keys(refs).filter(key => refs[key].checked);
}

export function findUnchecked(refs) {
  return Object.keys(refs).filter(key => !refs[key].checked);
}