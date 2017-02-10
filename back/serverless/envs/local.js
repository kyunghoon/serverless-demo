// development config

const common = require('./common.js');

const vars = {
  AWS_ACCESS_KEY_ID: 'omit',
  AWS_SECRET_ACCESS_KEY: 'omit',
  AWS_REGION: 'us-east-1',
  AWS_DYNAMO_DB_ENDPOINT: 'http://localhost:8000',
  CORS_ALLOW_ORIGIN: '*',
};

module.exports = Object.assign({}, common, vars);
