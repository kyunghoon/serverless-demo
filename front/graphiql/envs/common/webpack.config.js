const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({

  entry: Object.assign({
    app: path.join(__dirname, '../../index.js'),
  }, options.entry),

  output: Object.assign({
    path: path.join(__dirname, '../../build'),
    filename: '[name].js',
  }, options.output),

  module: {
    rules: [

      // transform all .js files required somewhere with Babel
      { test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /build/],
        options: {
          presets: ['es2015'],
        },
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

      { test: /\.png$/,
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

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'DEVELOPMENT'),
      'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT),
    }),
  ]),

});
