const path = require('path');
const webpack = require('webpack');

module.exports={
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/daisy.ts'],
  output:{
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'daisy.js',
    library: 'daisy',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        include: path.resolve(__dirname, "src"),
        loader: 'ts-loader'
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  },
  resolve:{
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  watchOptions: {
    ignored: ['node_modules']
  }
}
