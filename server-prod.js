const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

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
