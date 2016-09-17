const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + 'dist'));
app.use(express.static(__dirname + 'dist/static'));

app.get(/bundle.js$/, function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/static/bundle.js'));
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port);
console.log('server_started');
