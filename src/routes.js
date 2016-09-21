import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import PostsIndex from './containers/PostsIndex';
import Admin from './containers/Admin';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex}></IndexRoute>
    <Route path="/admin" component={Admin}></Route>
  </Route>
);

