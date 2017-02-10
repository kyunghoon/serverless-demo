const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PORT = 8080;

module.exports = require('../common/webpack.config.js')({

  entry: {
    app: [
      path.join(__dirname, '../../index.js'),
      // the entry point of our app
    ],
  },

  output: {
    filename: '[name].[hash:8].js',
    // the output bundle
  },

  defines: {
    'process.env.GRAPHQL_ENDPOINT': '"https://9276kvu81j.execute-api.ap-northeast-1.amazonaws.com/dev/graphql"',
  },

  devtool: 'inline-source-map',

  devServer: {
    host: 'localhost',
    port: PORT,

    historyApiFallback: true,
    // respond to 404s with index.html
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

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new CopyWebpackPlugin([
      { from: 'error.html', to: 'error.html' },
    ]),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 512,
      minRatio: 0.8,
    }),
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
