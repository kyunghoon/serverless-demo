// common config

if (!process.env.TWITTER_CONSUMER_KEY) throw new Error('TWITTER_CONSUMER_KEY not set');
if (!process.env.TWITTER_CONSUMER_SECRET) throw new Error('TWITTER_CONSUMER_SECRET not set');
if (!process.env.TWITTER_ACCESS_TOKEN_KEY) throw new Error('TWITTER_ACCESS_TOKEN_KEY not set');
if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('TWITTER_ACCESS_TOKEN_SECRET not set');

module.exports = {
  AUTH_TOKEN_SECRET: 'zw2G8m6WFvAUpel13Zl7qXYhq8MW6dMBMicloB3B8eZkGvGdOH',
  AWS_REGION: 'us-east-1',
  AWS_DYNAMO_DB_ENDPOINT: 'http://localhost:8000',
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY: process.env.TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
