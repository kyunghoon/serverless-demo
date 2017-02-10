const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PORT = 8080;

module.exports = require('../common/webpack.config.js')({

  entry: {
    app: [
      'react-hot-loader/patch',
      // activate HMR for React

      `webpack-dev-server/client?http://localhost:${PORT}`,
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      path.join(__dirname, '../../index.js'),
      // the entry point of our app
    ],
  },

  output: {
    filename: '[name].js',
    // the output bundle
  },

  defines: {
    'process.env.GRAPHQL_ENDPOINT': '"http://localhost:3000/graphql"',
  },

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    port: PORT,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Demo',
      template: path.join(__dirname, '../../index.html'),
      chunks: ['common', 'app'],
      hash: true,
      cache: true,
      favicon: path.join(__dirname, '../../favicon.ico'),
      minify: false,
    }),
    // configure index html

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new CopyWebpackPlugin([
      { from: 'error.html', to: 'error.html' },
    ]),
  ],

  cssLoaders: [
    { loader: 'style-loader' },
    { loader: 'css-loader',
      options: {
        localIdentName: '[path][local]',
        modules: true,
        importLoaders: true,
        sourceMap: true,
      },
    },
    { loader: 'postcss-loader' },
  ],
  // load the CSS in a style tag in development

  externals: ['lodash'],

});
