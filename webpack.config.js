var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/daisy.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'daisy.js',
    library: 'daisy',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              plugins: [
                "transform-class-properties",
                "syntax-class-properties"
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
