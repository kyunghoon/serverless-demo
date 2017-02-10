const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({

  context: path.resolve(__dirname, '../../'),

  entry: Object.assign({
    common: path.join(__dirname, '../../common.js'),
  }, options.entry),

  output: Object.assign({

    path: path.join(__dirname, '../../build'),

    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks

    filename: '[name].[hash:8].js',

  }, options.output || {}),

  devtool: options.devtool,

  module: {
    rules: [

      { test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },

      // transform our own .css files with PostCSS and CSS-modules
      { test: /\.css$/,
        exclude: /node_modules/,
        loader: options.cssLoaders,
      },

      // avoid transforming vendor CSS with CSS-modules, they should remain in global CSS scope.
      { test: /\.css$/,
        include: /node_modules/,
        loader: ['style-loader', 'css-loader'],
      },

      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },

      { test: /\.svg$/,
        loader: [{
          loader: 'url-loader',
          options: {
            limit: 0,
          },
        }],
      },

    ],
  },

  devServer: options.devServer,

  plugins: [].concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin(Object.assign({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'local'),
    }, options.defines || {})),
  ], options.plugins || []),

});
