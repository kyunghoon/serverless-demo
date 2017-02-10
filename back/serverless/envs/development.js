// development config

const common = require('./common.js');

const vars = {
  AWS_ACCESS_KEY_ID: null,
  AWS_SECRET_ACCESS_KEY: null,
  AWS_REGION: 'ap-northeast-1',
  AWS_DYNAMO_DB_ENDPOINT: 'https://dynamodb.ap-northeast-1.amazonaws.com',
  CORS_ALLOW_ORIGIN: 'http://kyunghoon-demo-client.s3-website-ap-northeast-1.amazonaws.com',
};

module.exports = Object.assign({}, common, vars);
