var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname },
      {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'}
    ]
  }
};

// PRODUCTION SETTINGS
if (process.env.NODE_ENV==='production') {
  config = {
    devtool: 'cheap-module-eval-source-map',
    entry: './index',
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
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname, query: {presets: ['es2015', 'react']}},
        {test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'}
      ]
    }
  };
}

console.log(config);
module.exports = config;
