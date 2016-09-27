var path = require('path');
var webpack = require('webpack');
var distPath = path.join(__dirname, 'dist');
var srcPath = path.join(__dirname, 'src');

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: srcPath },
      {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"]}
    ]
  }
};

// PRODUCTION SETTINGS
if (process.env.NODE_ENV==='production') {
  config = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index',
    output: {
      path: path.join(__dirname, 'dist/static'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: srcPath, query: {presets: ['es2015', 'react']}},
        {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
        {test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"]}
      ]
    }
  };
}

console.log(config);
module.exports = config;
