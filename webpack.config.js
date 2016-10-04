const HtmlWebpackPlugin = require('html-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: '../cleverjobserver/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app.html'
    }),
    new EnvironmentPlugin(['API_URL']),
    new ExtractTextPlugin('/styles/bundle.css')
  ],
  module: {
    preLoader: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style!',
      'css?sourceMap!sass?sourceMap')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style!',
      'css')
    },
    {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss/includes']
  }
};
