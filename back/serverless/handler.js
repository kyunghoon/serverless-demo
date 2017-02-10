require('babel-polyfill');

const handler = require('./src/handler');

module.exports.graphql = handler.graphql;