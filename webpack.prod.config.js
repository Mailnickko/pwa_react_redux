const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'src/main'),
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    port: 4000
  },
  plugins: [
  new CopyWebpackPlugin([
      { from: 'service-worker.js' },
      { from: 'manifest.json' },
      { from: 'src/images' }
    ]),
  // optimizes order of minification
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  // extracts into a separate file
    new ExtractTextPlugin('bundle.css'),
  // eliminate duplicate packages
    new webpack.optimize.DedupePlugin(),
  // minifies JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint-loader',
    //     exclude: '/node_modules/'
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract("css?sourceMap")
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192'},
    ]
  }
}
