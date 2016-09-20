const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const sendIndex = (res) => res.sendFile(path.resolve(__dirname, 'dist/index.html'));

app.get('/', function (req, res) {
  sendIndex(res);
});
app.get(/index.html$/, function (req, res) {
  sendIndex(res);
});
app.get(/\/static\//, function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', req.url));
});

app.listen(port);
console.log('server_started');
