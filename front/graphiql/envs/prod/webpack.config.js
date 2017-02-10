const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = require('../common/webpack.config')({

  // extract all css into a separate file
  cssLoaders: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
      { loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: true,
        },
      },
      { loader: 'postcss-loader' },
    ],
  }),

  plugins: [
  ],

});

/*
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

// TODO export this function and use in dev & prod
function templateContent() {
  return fs.readFileSync(path.resolve(process.cwd(), 'app/index.html')).toString();
}

module.exports = require('../common/webpack')({
  // In production, we skip all hot-reloading stuff.
  entry: [
    'whatwg-fetch',
    path.join(process.cwd(), 'front/app.js'), // Start with js/app.js
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes)
  // to compiled assets.
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(process.cwd(), 'build', 'frontend'),
    publicPath: '/',
  },

  plugins: [
    new WebpackMd5Hash(),

    // TODO minify again
    // Minify and optimize the JavaScript.
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),

    // Extract the CSS into a seperate file.
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),

    // Minify and optimize the index.ejs
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      templateContent: templateContent(), // eslint-disable-line
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: true,
        },
      },
      { loader: 'postcss-loader' },
    ],
  }),
});
*/
