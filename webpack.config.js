const webpack = require('webpack');
const path = require('path');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './daisy.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    publicPath: "/assets/",
    filename: 'daisy.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),    // New
  },
};

module.exports = config;
