const path = require('path');

module.exports = {
  devtool: process.env !== 'PRODUCTION' ? '#cheap-module-source-map' : false,
  entry: {
    demo0: [
      'babel-polyfill',
      './demos/demo0/index.jsx',
    ],
    demo1: [
      'babel-polyfill',
      './demos/demo1/index.jsx',
    ],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      'redux-autoloader': './src/react-break',
    },
  },
  output: {
    filename: '[name]/bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'demos'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
